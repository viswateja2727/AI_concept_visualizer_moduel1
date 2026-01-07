import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const AIPipelineAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-8">
        The AI Pipeline: 3 Key Ingredients 🔄
      </h3>
      
      {/* Pipeline Visualization */}
      <div className="flex items-center gap-4 mb-8">
        {/* Input */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-6 rounded-2xl border-3 transition-all ${
            step >= 1 ? 'bg-blue-100 border-blue-400' : 'bg-muted border-border'
          }`}>
            <span className="text-5xl block text-center">📥</span>
            <p className="font-bold text-center mt-2">Input</p>
            {step >= 1 && (
              <motion.p
                className="text-xs text-center text-blue-600 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                (A cat photo 🐱)
              </motion.p>
            )}
          </div>
          {step >= 1 && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              1
            </motion.div>
          )}
        </motion.div>
        
        {/* Arrow 1 */}
        <motion.div
          className="text-3xl"
          animate={step >= 2 ? { x: [0, 5, 0] } : { opacity: 0.3 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ➡️
        </motion.div>
        
        {/* AI Model */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`p-6 rounded-2xl border-3 transition-all ${
            step >= 2 ? 'bg-primary/20 border-primary' : 'bg-muted border-border'
          }`}>
            <motion.span
              className="text-5xl block text-center"
              animate={step >= 2 ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.span>
            <p className="font-bold text-center mt-2">AI Model</p>
            {step >= 2 && (
              <motion.p
                className="text-xs text-center text-primary mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                (Processes data)
              </motion.p>
            )}
          </div>
          {step >= 2 && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              2
            </motion.div>
          )}
          
          {/* Training Data coming from below */}
          {step >= 3 && (
            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-0.5 h-6 bg-amber-400" />
              <div className="p-3 bg-amber-100 rounded-xl border-2 border-amber-400">
                <span className="text-2xl">📚</span>
                <p className="text-xs font-bold text-amber-700">Training Data</p>
              </div>
              <motion.div
                className="absolute -top-6 -right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                3
              </motion.div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Arrow 2 */}
        <motion.div
          className="text-3xl"
          animate={step >= 4 ? { x: [0, 5, 0] } : { opacity: 0.3 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ➡️
        </motion.div>
        
        {/* Output */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={`p-6 rounded-2xl border-3 transition-all ${
            step >= 4 ? 'bg-success/20 border-success' : 'bg-muted border-border'
          }`}>
            <span className="text-5xl block text-center">📤</span>
            <p className="font-bold text-center mt-2">Output</p>
            {step >= 4 && (
              <motion.p
                className="text-xs text-center text-success font-bold mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                "It's a cat!"
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg mt-8"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step >= 5 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Every AI system has this structure: Input → Model (trained on data) → Output!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
