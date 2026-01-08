import { useCallback, useEffect, useRef, useState } from "react";

type PlayOptions = {
  signal?: AbortSignal;
};

export const useAudioNarration = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const currentTextRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const playTokenRef = useRef(0);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }, []);

  const stopNarration = useCallback(() => {
    playTokenRef.current += 1;

    abortRef.current?.abort();
    abortRef.current = null;

    cleanupAudio();

    setIsPlaying(false);
    setIsLoading(false);
    currentTextRef.current = "";
  }, [cleanupAudio]);

  const playNarration = useCallback(
    async (text: string, options: PlayOptions = {}) => {
      // interrupt any pending fetch/play
      stopNarration();

      // Skip if same text is requested while already playing
      if (currentTextRef.current === text && isPlaying) return;

      const myToken = playTokenRef.current;
      currentTextRef.current = text;

      const controller = new AbortController();
      abortRef.current = controller;

      // If caller provides a signal, mirror its abort into ours
      if (options.signal) {
        if (options.signal.aborted) controller.abort();
        else {
          const onAbort = () => controller.abort();
          options.signal.addEventListener("abort", onAbort, { once: true });
        }
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openai-tts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ text }),
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
        if (controller.signal.aborted || myToken !== playTokenRef.current) return;

        const audioBlob = await response.blob();
        if (controller.signal.aborted || myToken !== playTokenRef.current) return;

        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        setIsPlaying(true);

        await new Promise<void>((resolve) => {
          audio.onended = () => resolve();
          audio.onerror = () => resolve();

          // We keep this separate so abort always stops playback immediately
          controller.signal.addEventListener(
            "abort",
            () => {
              resolve();
            },
            { once: true }
          );

          audio
            .play()
            .catch(() => resolve());
        });
      } catch (error) {
        // AbortError is expected when user closes/mutes.
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Audio narration error:", error);
        }
      } finally {
        if (myToken === playTokenRef.current) {
          setIsPlaying(false);
          setIsLoading(false);
          cleanupAudio();
        }
      }
    },
    [cleanupAudio, isPlaying, stopNarration]
  );

  useEffect(() => {
    return () => stopNarration();
  }, [stopNarration]);

  return {
    playNarration,
    stopNarration,
    isPlaying,
    isLoading,
  };
};

