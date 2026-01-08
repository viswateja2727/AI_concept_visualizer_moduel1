import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

const pipelineSteps = [
  { id: 'prompt', label: 'Prompt', emoji: '💬', color: 'from-blue-400 to-blue-500' },
  { id: 'tokens', label: 'Tokens', emoji: '🧩', color: 'from-purple-400 to-purple-500' },
  { id: 'embeddings', label: 'Embeddings', emoji: '📊', color: 'from-pink-400 to-pink-500' },
  { id: 'transformer', label: 'Transformer', emoji: '⚡', color: 'from-amber-400 to-amber-500' },
  { id: 'logits', label: 'Logits', emoji: '📈', color: 'from-green-400 to-green-500' },
  { id: 'softmax', label: 'Softmax', emoji: '🎯', color: 'from-teal-400 to-teal-500' },
  { id: 'output', label: 'Next Word', emoji: '✨', color: 'from-rose-400 to-rose-500' },
];

const tokenExamples = ['Hello', ',', ' how', ' are', ' you', '?'];

export const LLMPipelineAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [activeToken, setActiveToken] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 8 ? prev + 1 : prev));
    }, 3500);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 2) {
      const tokenTimer = setInterval(() => {
        setActiveToken(prev => (prev + 1) % tokenExamples.length);
      }, 600);
      return () => clearInterval(tokenTimer);
    }
  }, [step]);

  const getStepDescription = () => {
    switch(step) {
      case 0: return "Let's see how a Large Language Model (LLM) works inside! 🧠";
      case 1: return "First, you type a prompt - your question or instruction 💬";
      case 2: return "The prompt gets split into small pieces called TOKENS 🧩";
      case 3: return "Each token becomes a number pattern called an EMBEDDING 📊";
      case 4: return "Transformer layers process and understand the meaning ⚡";
      case 5: return "The model calculates LOGITS - scores for each possible next word 📈";
      case 6: return "SOFTMAX converts scores to probabilities (must add up to 100%) 🎯";
      case 7: return "The model picks the most likely NEXT WORD! ✨";
      default: return "This process repeats for every word the AI generates! 🔄";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-4">
      <h3 className="text-xl font-bold text-foreground mb-6 text-center">
        Inside an LLM: How Words Become AI Magic 🪄
      </h3>

      {/* Main Pipeline Visualization */}
      <div className="relative w-full max-w-3xl mb-6">
        {/* Context Window Container */}
        <motion.div
          className="relative p-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-4 border-dashed border-primary/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Context Window Label */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
          >
            📦 Context Window (Memory Limit)
          </motion.div>

          {/* Prompt Input */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: step >= 1 ? 1 : 0.3, x: 0 }}
          >
            <div className="flex items-center gap-3 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">PROMPT</p>
                <p className="text-foreground font-medium">"Hello, how are you?"</p>
              </div>
            </div>
          </motion.div>

          {/* LLM Box */}
          <motion.div
            className="relative p-4 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 rounded-2xl border-3 border-purple-400 dark:border-purple-600 shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0.4 }}
          >
            {/* LLM Label */}
            <div className="absolute -top-3 left-4 px-3 py-1 bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              🤖 LLM Brain
            </div>

            {/* Pipeline Steps */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {pipelineSteps.map((pStep, index) => {
                const isActive = step >= index + 2;
                const isCurrent = step === index + 2;
                
                return (
                  <motion.div
                    key={pStep.id}
                    className="relative"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3, 
                      scale: isActive ? 1 : 0.8,
                    }}
                    transition={{ delay: 0.1 * index, type: 'spring' }}
                  >
                    <motion.div
                      className={`flex flex-col items-center p-3 rounded-xl bg-gradient-to-br ${pStep.color} text-white min-w-[80px] shadow-lg`}
                      animate={isCurrent ? {
                        scale: [1, 1.1, 1],
                        boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)']
                      } : {}}
                      transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                    >
                      <span className="text-2xl mb-1">{pStep.emoji}</span>
                      <span className="text-xs font-bold">{pStep.label}</span>
                    </motion.div>
                    
                    {/* Arrow between steps */}
                    {index < pipelineSteps.length - 1 && (
                      <motion.div
                        className="absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                      >
                        →
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Token Visualization */}
            {step >= 2 && step <= 3 && (
              <motion.div
                className="mt-4 p-3 bg-white/50 dark:bg-black/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs text-center text-muted-foreground mb-2">Breaking into tokens:</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {tokenExamples.map((token, i) => (
                    <motion.span
                      key={i}
                      className={`px-2 py-1 rounded text-sm font-mono ${
                        i === activeToken 
                          ? 'bg-purple-500 text-white scale-110' 
                          : 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-200'
                      }`}
                      animate={i === activeToken ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {token === ' how' || token === ' are' || token === ' you' ? `"${token}"` : `"${token}"`}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Embedding Visualization */}
            {step >= 3 && step <= 4 && (
              <motion.div
                className="mt-4 p-3 bg-white/50 dark:bg-black/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs text-center text-muted-foreground mb-2">Tokens become number patterns:</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col gap-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * i }}
                    >
                      {[0.8, 0.3, 0.5, 0.9].map((val, j) => (
                        <motion.div
                          key={j}
                          className="w-8 h-2 rounded-full bg-pink-400"
                          style={{ opacity: val }}
                          animate={{ scaleX: [1, 0.8 + val * 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Probability Visualization */}
            {step >= 6 && step <= 7 && (
              <motion.div
                className="mt-4 p-3 bg-white/50 dark:bg-black/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs text-center text-muted-foreground mb-2">Probability of next word:</p>
                <div className="space-y-1">
                  {[
                    { word: 'doing', prob: 45 },
                    { word: 'feeling', prob: 30 },
                    { word: 'today', prob: 15 },
                    { word: 'other...', prob: 10 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className="text-xs w-16 text-right text-foreground">{item.word}</span>
                      <motion.div
                        className={`h-4 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-teal-400'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.prob}%` }}
                        transition={{ duration: 0.8, delay: 0.2 * i }}
                      />
                      <span className="text-xs text-muted-foreground">{item.prob}%</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Output */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: step >= 7 ? 1 : 0.3, x: 0 }}
          >
            <div className="flex items-center gap-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl border-2 border-green-300 dark:border-green-700">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">OUTPUT</p>
                <motion.p 
                  className="text-foreground font-medium"
                  animate={step >= 7 ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {step >= 7 ? '"doing"' : '???'}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        className="text-center max-w-xl px-4"
        key={step}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-4 rounded-xl border-2 ${
          step >= 8 
            ? 'bg-primary/10 border-primary/30' 
            : 'bg-muted border-border'
        }`}>
          <p className={`text-lg font-medium ${step >= 8 ? 'text-primary' : 'text-foreground'}`}>
            {getStepDescription()}
          </p>
        </div>
      </motion.div>

      {/* Step Progress */}
      <div className="flex gap-2 mt-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`}
            animate={i === step ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
};
