import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const AIAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 2200);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const catPhotos = ['🐱', '🐈', '😺', '🐈‍⬛', '😸'];
  const dogPhotos = ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩'];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      {/* Brain Learning Visualization */}
      <div className="relative mb-8">
        {/* Central Brain */}
        <motion.div
          className="w-32 h-32 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-full h-full text-8xl flex items-center justify-center"
            animate={step >= 1 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🧠
          </motion.div>
          
          {/* Neural connections */}
          {step >= 2 && (
            <>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  style={{
                    left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 70}px)`,
                    top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 70}px)`,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
        
        {/* Learning from Data */}
        {step >= 1 && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Cat photos flowing in */}
            <motion.div
              className="absolute -left-32 top-1/2 -translate-y-1/2 flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {catPhotos.map((cat, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {cat}
                </motion.span>
              ))}
              <span className="text-xs text-muted-foreground mt-1">Cats</span>
            </motion.div>
            
            {/* Dog photos flowing in */}
            <motion.div
              className="absolute -right-32 top-1/2 -translate-y-1/2 flex flex-col gap-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {dogPhotos.map((dog, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  {dog}
                </motion.span>
              ))}
              <span className="text-xs text-muted-foreground mt-1">Dogs</span>
            </motion.div>
          </div>
        )}
      </div>
      
      {/* New Photo Test */}
      {step >= 3 && (
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-4 bg-card rounded-xl border-2 border-dashed border-border">
            <span className="text-5xl">🐱</span>
            <p className="text-xs text-center text-muted-foreground mt-1">New photo</p>
          </div>
          
          <motion.div
            className="text-3xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.div>
          
          <motion.div
            className="p-4 bg-success/20 rounded-xl border-2 border-success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-lg font-bold text-success">It's a CAT! 🎉</p>
          </motion.div>
        </motion.div>
      )}
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step === 1 && (
          <p className="text-lg text-foreground">
            AI <span className="font-bold text-primary">learns patterns</span> from lots of examples
          </p>
        )}
        {step === 2 && (
          <p className="text-lg text-foreground">
            It finds what makes cats different from dogs - whiskers, ears, face shape...
          </p>
        )}
        {step === 3 && (
          <p className="text-lg text-foreground">
            Now when it sees a <span className="font-bold">new</span> photo, it can recognize it!
          </p>
        )}
        {step >= 4 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 AI LEARNS from data - that's what makes it different from automation!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
