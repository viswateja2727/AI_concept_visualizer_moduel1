import { useCallback, useEffect, useRef, useState } from "react";

export const useAudioNarration = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef<string>("");

  const stopNarration = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsLoading(false);
    currentTextRef.current = "";
  }, []);

  const playNarration = useCallback(
    async (text: string) => {
      // Stop any ongoing narration
      stopNarration();

      // Skip if same text is requested while already playing
      if (currentTextRef.current === text && isPlaying) return;

      currentTextRef.current = text;
      setIsLoading(true);

      // Check if speech synthesis is supported
      if (!window.speechSynthesis) {
        console.error("Speech synthesis not supported in this browser");
        setIsLoading(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Get available voices and select a female voice
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prefer female voices - look for common female voice names
        const femaleVoice = voices.find(
          (voice) =>
            voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("samantha") ||
            voice.name.toLowerCase().includes("victoria") ||
            voice.name.toLowerCase().includes("karen") ||
            voice.name.toLowerCase().includes("moira") ||
            voice.name.toLowerCase().includes("tessa") ||
            voice.name.toLowerCase().includes("fiona") ||
            voice.name.includes("Google US English") ||
            (voice.name.includes("en") && voice.name.includes("Female"))
        );

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        } else if (voices.length > 0) {
          // Fall back to first English voice or first available
          const englishVoice = voices.find((v) => v.lang.startsWith("en"));
          utterance.voice = englishVoice || voices[0];
        }
      };

      // Voices may not be loaded immediately
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }

      // Configure voice settings for a smooth, teaching-friendly pace
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        currentTextRef.current = "";
      };

      utterance.onerror = (event) => {
        // Ignore 'interrupted' errors as they're expected when stopping
        if (event.error !== "interrupted") {
          console.error("Speech synthesis error:", event.error);
        }
        setIsPlaying(false);
        setIsLoading(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isPlaying, stopNarration]
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
