import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const LanguageModelAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  const fullResponse = "Paris is the capital of France! 🗼";
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 3 && typedText.length < fullResponse.length) {
      const typeTimer = setInterval(() => {
        setTypedText(prev => fullResponse.slice(0, prev.length + 1));
      }, 80);
      return () => clearInterval(typeTimer);
    }
  }, [step, typedText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-8">
        Language Models: AI That Reads & Writes 💬
      </h3>
      
      <div className="flex items-center gap-6 mb-8">
        {/* User Question */}
        <motion.div
          className="relative max-w-[200px]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-4 bg-blue-100 rounded-2xl rounded-bl-sm border-2 border-blue-300">
            <p className="text-sm text-foreground">
              {step >= 1 ? "What is the capital of France? 🤔" : "..."}
            </p>
          </div>
          <span className="absolute -bottom-3 left-2 text-3xl">👤</span>
        </motion.div>
        
        {/* Processing AI */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center"
            animate={step >= 2 ? {
              boxShadow: [
                '0 0 0px rgba(20, 184, 166, 0)',
                '0 0 30px rgba(20, 184, 166, 0.5)',
                '0 0 0px rgba(20, 184, 166, 0)'
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: step >= 2 && step < 4 ? Infinity : 0 }}
          >
            <span className="text-5xl">🤖</span>
          </motion.div>
          
          {/* Thinking bubbles */}
          {step >= 2 && step < 4 && (
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              💭
            </motion.div>
          )}
        </motion.div>
        
        {/* AI Response */}
        <motion.div
          className="relative max-w-[200px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: step >= 3 ? 1 : 0.3, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-4 bg-success/20 rounded-2xl rounded-br-sm border-2 border-success">
            <p className="text-sm text-foreground min-h-[40px]">
              {typedText}
              {step >= 3 && typedText.length < fullResponse.length && (
                <motion.span
                  className="inline-block w-2 h-4 bg-primary ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </p>
          </div>
          <span className="absolute -bottom-3 right-2 text-3xl">🤖</span>
        </motion.div>
      </div>
      
      {/* Training Examples */}
      {step >= 1 && (
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="w-full text-center text-sm text-muted-foreground mb-2">
            Trained on millions of text examples:
          </p>
          {['Books 📚', 'News 📰', 'Wikipedia 🌐', 'Websites 💻'].map((item, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 bg-muted rounded-full text-xs"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      )}
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step >= 5 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Language Models understand and generate text by learning from massive amounts of writing!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
