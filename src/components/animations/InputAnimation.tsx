import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const InputAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const inputTypes = [
    { type: 'Images', icon: '📷', examples: ['Photos', 'Drawings', 'X-rays'], color: 'bg-blue-100' },
    { type: 'Text', icon: '📝', examples: ['Questions', 'Documents', 'Emails'], color: 'bg-green-100' },
    { type: 'Numbers', icon: '🔢', examples: ['Temperatures', 'Prices', 'Measurements'], color: 'bg-purple-100' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-8">
        What can we feed to AI? 📥
      </h3>
      
      <div className="flex items-center gap-8 mb-8">
        {/* Input Types */}
        <div className="flex flex-col gap-4">
          {inputTypes.map((input, index) => (
            <motion.div
              key={input.type}
              className={`p-4 rounded-2xl ${input.color} shadow-md`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: step >= index + 1 ? 1 : 0.3, 
                x: 0,
                scale: step === index + 1 ? 1.05 : 1
              }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{input.icon}</span>
                <div>
                  <p className="font-bold text-foreground">{input.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {input.examples.join(', ')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Arrow */}
        <motion.div
          className="text-4xl"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ➡️
        </motion.div>
        
        {/* AI System */}
        <motion.div
          className="relative p-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl border-2 border-primary/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-7xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🤖
          </motion.div>
          <p className="text-center font-bold text-primary mt-2">AI System</p>
          
          {/* Processing sparkles */}
          {step >= 2 && (
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {step < 4 ? (
          <p className="text-lg text-foreground">
            <span className="font-bold text-primary">Input</span> is the data we give to AI to process.
            It can be photos, text, numbers, or sounds!
          </p>
        ) : (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Input is the first ingredient in every AI system!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
