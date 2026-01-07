import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const TrainingDataAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [trainedCount, setTrainedCount] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 2 && trainedCount < 100) {
      const countTimer = setInterval(() => {
        setTrainedCount(prev => Math.min(prev + 5, 100));
      }, 100);
      return () => clearInterval(countTimer);
    }
  }, [step, trainedCount]);

  const trainingExamples = [
    { image: '🐱', label: 'Cat', status: trainedCount > 10 },
    { image: '🐕', label: 'Dog', status: trainedCount > 25 },
    { image: '🐈', label: 'Cat', status: trainedCount > 40 },
    { image: '🐶', label: 'Dog', status: trainedCount > 55 },
    { image: '😺', label: 'Cat', status: trainedCount > 70 },
    { image: '🦮', label: 'Dog', status: trainedCount > 85 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        How AI Learns From Examples 📚
      </h3>
      
      <div className="flex items-center gap-8">
        {/* Training Data Examples */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {trainingExamples.map((example, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-xl border-2 transition-all ${
                example.status 
                  ? 'bg-success/20 border-success' 
                  : 'bg-card border-border'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="text-center">
                <span className="text-3xl">{example.image}</span>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  {example.label} {example.status && '✓'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Arrow with data flow */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="text-3xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ➡️
          </motion.div>
          {step >= 2 && (
            <motion.div
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Learning...
            </motion.div>
          )}
        </div>
        
        {/* AI Brain */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border-2 border-primary/30">
            <motion.div
              className="text-6xl text-center"
              animate={step >= 2 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🧠
            </motion.div>
            
            {/* Progress Bar */}
            <div className="mt-4 w-32">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${trainedCount}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground mt-1">
                {trainedCount}% trained
              </p>
            </div>
          </div>
          
          {/* Knowledge bubbles */}
          {step >= 3 && (
            <>
              <motion.div
                className="absolute -top-3 -right-3 px-2 py-1 bg-success text-white text-xs rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Whiskers!
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-3 px-2 py-1 bg-primary text-white text-xs rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Fur patterns!
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Explanation */}
      <motion.div
        className="mt-8 text-center max-w-lg"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step === 1 && (
          <p className="text-lg text-foreground">
            Training data is a collection of <span className="font-bold text-primary">labeled examples</span>
          </p>
        )}
        {step === 2 && (
          <p className="text-lg text-foreground">
            The AI looks at thousands of examples to <span className="font-bold text-primary">find patterns</span>
          </p>
        )}
        {step === 3 && (
          <p className="text-lg text-foreground">
            It learns features like whiskers, fur, and ear shapes!
          </p>
        )}
        {step >= 4 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Good training data = Smart AI! The more examples, the better it learns!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
