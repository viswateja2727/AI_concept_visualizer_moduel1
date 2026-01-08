import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const pipelineSteps = [
  { 
    id: 'prompt', 
    label: 'Prompt', 
    emoji: '💬', 
    color: 'from-blue-400 to-blue-500',
    description: "You type a prompt - your question or instruction to the AI"
  },
  { 
    id: 'tokens', 
    label: 'Tokens', 
    emoji: '🧩', 
    color: 'from-purple-400 to-purple-500',
    description: "Your prompt gets split into small pieces called TOKENS"
  },
  { 
    id: 'embeddings', 
    label: 'Embeddings', 
    emoji: '📊', 
    color: 'from-pink-400 to-pink-500',
    description: "Each token becomes a number pattern called an EMBEDDING"
  },
  { 
    id: 'transformer', 
    label: 'Transformer', 
    emoji: '⚡', 
    color: 'from-amber-400 to-amber-500',
    description: "Transformer layers process and understand the meaning"
  },
  { 
    id: 'logits', 
    label: 'Logits', 
    emoji: '📈', 
    color: 'from-green-400 to-green-500',
    description: "The model calculates LOGITS - scores for each possible next word"
  },
  { 
    id: 'softmax', 
    label: 'Softmax', 
    emoji: '🎯', 
    color: 'from-teal-400 to-teal-500',
    description: "SOFTMAX converts scores to probabilities (must add up to 100%)"
  },
  { 
    id: 'output', 
    label: 'Next Word', 
    emoji: '✨', 
    color: 'from-rose-400 to-rose-500',
    description: "The model picks the most likely NEXT WORD!"
  },
];

const tokenExamples = ['Hello', ',', ' how', ' are', ' you', '?'];

const LLMPipeline = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeToken, setActiveToken] = useState(0);

  const resetAnimation = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setActiveToken(0);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev < pipelineSteps.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;
    
    if (currentStep >= pipelineSteps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      nextStep();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, nextStep]);

  // Token animation
  useEffect(() => {
    if (currentStep === 1) {
      const tokenTimer = setInterval(() => {
        setActiveToken(prev => (prev + 1) % tokenExamples.length);
      }, 400);
      return () => clearInterval(tokenTimer);
    }
  }, [currentStep]);

  const handlePlay = () => {
    if (currentStep >= pipelineSteps.length - 1) {
      resetAnimation();
      setTimeout(() => {
        setIsPlaying(true);
        setCurrentStep(0);
      }, 100);
    } else {
      setIsPlaying(true);
      if (currentStep === -1) {
        setCurrentStep(0);
      }
    }
  };

  const getCurrentDescription = () => {
    if (currentStep === -1) {
      return "Let's see how a Large Language Model (LLM) works inside! Press play to start 🧠";
    }
    return pipelineSteps[currentStep]?.description || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Concepts
          </Button>
          <h1 className="text-xl font-bold text-foreground">LLM Pipeline Explorer</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Inside an LLM: How Words Become AI Magic 🪄
          </h2>
          <p className="text-muted-foreground text-lg">
            Prompt → Tokens → Embeddings → Transformer → Logits → Softmax → Next Word
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-8">
          <Button
            onClick={handlePlay}
            className="flex items-center gap-2"
            size="lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pause' : currentStep >= pipelineSteps.length - 1 ? 'Replay' : 'Play'}
          </Button>
          <Button
            variant="outline"
            onClick={nextStep}
            disabled={currentStep >= pipelineSteps.length - 1}
            size="lg"
            className="flex items-center gap-2"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={resetAnimation}
            size="lg"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Current Step Description */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`p-6 rounded-2xl border-2 text-center ${
            currentStep >= 0 
              ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-purple-300 dark:border-purple-700' 
              : 'bg-muted border-border'
          }`}>
            <p className="text-xl font-semibold text-foreground">
              {currentStep >= 0 && <span className="mr-2">{pipelineSteps[currentStep]?.emoji}</span>}
              {getCurrentDescription()}
            </p>
          </div>
        </motion.div>

        {/* Main Pipeline Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Context Window Container */}
          <motion.div
            className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-4 border-dashed border-primary/40"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Context Window Label */}
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              📦 Context Window (Memory Limit)
            </motion.div>

            {/* Prompt Input */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: currentStep >= 0 ? 1 : 0.3 }}
            >
              <div className={`flex items-center gap-4 p-4 rounded-xl border-3 transition-all duration-300 ${
                currentStep === 0 
                  ? 'bg-blue-200 dark:bg-blue-800/50 border-blue-500 shadow-lg shadow-blue-500/30 scale-[1.02]' 
                  : 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
              }`}>
                <span className="text-3xl">💬</span>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Prompt</p>
                  <p className="text-foreground font-medium text-lg">"Hello, how are you?"</p>
                </div>
              </div>
            </motion.div>

            {/* LLM Box */}
            <motion.div
              className="relative p-6 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 rounded-2xl border-3 border-purple-400 dark:border-purple-600 shadow-xl"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: currentStep >= 1 ? 1 : 0.4 }}
            >
              {/* LLM Label */}
              <div className="absolute -top-3 left-4 px-4 py-1 bg-purple-500 text-white rounded-lg text-sm font-bold flex items-center gap-2">
                🤖 LLM Brain
              </div>

              {/* Pipeline Steps */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {pipelineSteps.slice(1).map((pStep, index) => {
                  const stepIndex = index + 1;
                  const isActive = currentStep >= stepIndex;
                  const isCurrent = currentStep === stepIndex;
                  
                  return (
                    <motion.div
                      key={pStep.id}
                      className="relative"
                      initial={{ opacity: 0.3, scale: 0.9 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.3, 
                        scale: isCurrent ? 1.1 : isActive ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`flex flex-col items-center p-4 rounded-xl bg-gradient-to-br ${pStep.color} text-white min-w-[90px] shadow-lg transition-all duration-300`}
                        animate={isCurrent ? {
                          boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 30px rgba(255,255,255,0.6)', '0 0 0px rgba(255,255,255,0)']
                        } : {}}
                        transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <span className="text-3xl mb-1">{pStep.emoji}</span>
                        <span className="text-sm font-bold">{pStep.label}</span>
                      </motion.div>
                      
                      {/* Arrow between steps */}
                      {index < pipelineSteps.length - 2 && (
                        <motion.div
                          className="absolute -right-3 top-1/2 -translate-y-1/2 text-xl text-purple-500 dark:text-purple-300 z-10 font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isActive ? 1 : 0.3 }}
                        >
                          →
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Token Visualization */}
              {currentStep === 1 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Breaking into tokens:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tokenExamples.map((token, i) => (
                      <motion.span
                        key={i}
                        className={`px-3 py-2 rounded-lg text-base font-mono transition-all duration-200 ${
                          i === activeToken 
                            ? 'bg-purple-500 text-white scale-110 shadow-lg' 
                            : 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-200'
                        }`}
                      >
                        "{token}"
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Embedding Visualization */}
              {currentStep === 2 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Tokens become number patterns:</p>
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {[0.9, 0.4, 0.7, 0.2, 0.8].map((val, j) => (
                          <motion.div
                            key={j}
                            className="w-10 h-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500"
                            style={{ opacity: val }}
                            animate={{ scaleX: [1, 0.7 + val * 0.5, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.1 }}
                          />
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Transformer Visualization */}
              {currentStep === 3 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Attention layers processing:</p>
                  <div className="flex justify-center items-center gap-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold"
                        animate={{ 
                          y: [0, -8, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                      >
                        L{i + 1}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Logits Visualization */}
              {currentStep === 4 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Raw scores (logits) for possible words:</p>
                  <div className="space-y-2 max-w-xs mx-auto">
                    {[
                      { word: 'doing', score: 4.2 },
                      { word: 'feeling', score: 3.1 },
                      { word: 'today', score: 1.8 },
                      { word: 'fine', score: 1.2 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <span className="text-sm w-16 text-right text-foreground font-medium">{item.word}</span>
                        <div className="flex-1 h-6 bg-green-200 dark:bg-green-900/50 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.score / 5) * 100}%` }}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-10">{item.score}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Softmax Probability Visualization */}
              {currentStep === 5 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Softmax converts to probabilities (adds to 100%):</p>
                  <div className="space-y-2 max-w-xs mx-auto">
                    {[
                      { word: 'doing', prob: 52 },
                      { word: 'feeling', prob: 28 },
                      { word: 'today', prob: 12 },
                      { word: 'other...', prob: 8 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <span className="text-sm w-16 text-right text-foreground font-medium">{item.word}</span>
                        <div className="flex-1 h-6 bg-teal-200 dark:bg-teal-900/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-teal-400'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.prob}%` }}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">{item.prob}%</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Output */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: currentStep >= 6 ? 1 : 0.3 }}
            >
              <div className={`flex items-center gap-4 p-4 rounded-xl border-3 transition-all duration-300 ${
                currentStep === 6 
                  ? 'bg-green-200 dark:bg-green-800/50 border-green-500 shadow-lg shadow-green-500/30 scale-[1.02]' 
                  : 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
              }`}>
                <span className="text-3xl">✨</span>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Output</p>
                  <motion.p 
                    className="text-foreground font-medium text-lg"
                    animate={currentStep >= 6 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {currentStep >= 6 ? '"doing" ← Winner!' : '???'}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {pipelineSteps.map((step, i) => (
            <motion.button
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentStep 
                  ? 'bg-primary scale-125' 
                  : i < currentStep 
                    ? 'bg-primary/60' 
                    : 'bg-muted'
              }`}
              onClick={() => setCurrentStep(i)}
              whileHover={{ scale: 1.3 }}
              title={step.label}
            />
          ))}
        </div>

        {/* Completion Message */}
        {currentStep >= pipelineSteps.length - 1 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xl font-bold text-primary">
              🎉 This process repeats for every word the AI generates!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default LLMPipeline;
