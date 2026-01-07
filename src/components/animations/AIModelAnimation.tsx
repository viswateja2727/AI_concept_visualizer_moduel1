import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const AIModelAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const modelTypes = [
    { name: 'Vision Model', icon: '👁️', task: 'Sees images', color: 'from-blue-400 to-blue-500' },
    { name: 'Language Model', icon: '💬', task: 'Reads text', color: 'from-green-400 to-green-500' },
    { name: 'Prediction Model', icon: '📊', task: 'Finds patterns', color: 'from-purple-400 to-purple-500' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-8">
        The AI Model: The Brain of the System 🧠
      </h3>
      
      {/* Central Brain */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-28 h-28 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center shadow-xl"
          animate={step >= 1 ? { 
            boxShadow: [
              '0 0 20px rgba(20, 184, 166, 0.3)',
              '0 0 40px rgba(20, 184, 166, 0.5)',
              '0 0 20px rgba(20, 184, 166, 0.3)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-6xl">🤖</span>
        </motion.div>
        
        {/* Thinking bubbles */}
        {step >= 1 && (
          <>
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              💭
            </motion.div>
          </>
        )}
      </motion.div>
      
      {/* Model Types */}
      <div className="flex gap-6 mb-8">
        {modelTypes.map((model, index) => (
          <motion.div
            key={model.name}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: step >= index + 1 ? 1 : 0.3,
              y: 0,
              scale: step === index + 1 ? 1.05 : 1
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${model.color} shadow-lg`}>
              <div className="text-center text-white">
                <span className="text-4xl block mb-2">{model.icon}</span>
                <p className="font-bold text-sm">{model.name}</p>
                <p className="text-xs opacity-80">{model.task}</p>
              </div>
            </div>
            
            {/* Connection line to brain */}
            {step >= index + 1 && (
              <motion.div
                className="absolute -top-6 left-1/2 w-0.5 h-6 bg-primary/50"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'bottom' }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step === 1 && (
          <p className="text-lg text-foreground">
            <span className="font-bold text-primary">Vision models</span> are trained to understand images
          </p>
        )}
        {step === 2 && (
          <p className="text-lg text-foreground">
            <span className="font-bold text-primary">Language models</span> are trained to understand and write text
          </p>
        )}
        {step === 3 && (
          <p className="text-lg text-foreground">
            <span className="font-bold text-primary">Prediction models</span> find patterns in numbers
          </p>
        )}
        {step >= 4 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Different AI models are designed for different tasks!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
