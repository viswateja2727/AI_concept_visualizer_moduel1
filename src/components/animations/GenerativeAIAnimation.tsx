import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const GenerativeAIAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 6 ? prev + 1 : prev));
    }, 2000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const creations = [
    { type: 'Text', icon: '📝', prompt: '"Write a poem"', result: '🌟 Roses are red...' },
    { type: 'Image', icon: '🖼️', prompt: '"A sunset beach"', result: '🏖️ 🌅' },
    { type: 'Music', icon: '🎵', prompt: '"Happy melody"', result: '🎶 ♪ ♫' },
    { type: 'Code', icon: '💻', prompt: '"Make a button"', result: '< /> ✨' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Generative AI: Creating Something New ✨
      </h3>
      
      {/* Creation Process */}
      <div className="flex items-center gap-6 mb-8">
        {/* Input Prompt */}
        <motion.div
          className="p-4 bg-blue-100 rounded-2xl border-2 border-blue-300"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-sm text-muted-foreground mb-1">Your prompt:</p>
          <p className="font-bold text-foreground">
            {step >= 1 ? '"Create a magical forest"' : '...'}
          </p>
        </motion.div>
        
        {/* Magic Sparkles */}
        <motion.div
          className="relative"
          animate={step >= 2 ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-5xl">✨</span>
          {step >= 2 && (
            <>
              <motion.span
                className="absolute -top-2 -left-2 text-xl"
                animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              <motion.span
                className="absolute -bottom-2 -right-2 text-xl"
                animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                💫
              </motion.span>
            </>
          )}
        </motion.div>
        
        {/* Output */}
        <motion.div
          className="p-4 bg-success/20 rounded-2xl border-2 border-success relative overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: step >= 3 ? 1 : 0.3, x: 0 }}
        >
          <p className="text-sm text-muted-foreground mb-1">AI Creates:</p>
          {step >= 3 ? (
            <motion.div
              className="text-4xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              🌲🦋🍄🌸🌙
            </motion.div>
          ) : (
            <div className="w-24 h-8 bg-muted rounded animate-pulse" />
          )}
        </motion.div>
      </div>
      
      {/* Types of Generation */}
      {step >= 4 && (
        <motion.div
          className="grid grid-cols-4 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {creations.map((item, i) => (
            <motion.div
              key={i}
              className="p-3 bg-card rounded-xl border border-border text-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15 * i, type: 'spring' }}
            >
              <span className="text-3xl block">{item.icon}</span>
              <p className="text-xs font-bold text-foreground mt-1">{item.type}</p>
              <p className="text-[10px] text-muted-foreground">{item.prompt}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Key Point */}
      {step >= 5 && (
        <motion.div
          className="p-4 bg-amber-100 rounded-xl border-2 border-amber-400 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-amber-800">
            <span className="font-bold">Key difference:</span> It creates <em>NEW</em> content, not just finding existing things!
          </p>
        </motion.div>
      )}
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step >= 6 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Generative AI creates brand new content - text, images, music, and more!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
