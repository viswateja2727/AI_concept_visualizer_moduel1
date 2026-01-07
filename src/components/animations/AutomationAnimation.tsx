import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const AutomationAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 2000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      {/* Washing Machine Animation */}
      <div className="relative mb-8">
        {/* Machine Body */}
        <motion.div
          className="w-48 h-56 bg-gradient-to-b from-slate-200 to-slate-300 rounded-2xl relative shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Drum Window */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 border-8 border-slate-400 overflow-hidden"
          >
            {/* Spinning clothes */}
            <motion.div
              className="absolute inset-2 rounded-full"
              animate={step >= 2 ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-2 left-4 text-2xl">👕</div>
              <div className="absolute bottom-4 right-2 text-2xl">👖</div>
              <div className="absolute top-8 right-4 text-xl">🧦</div>
            </motion.div>
            
            {/* Water effect */}
            {step >= 2 && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-blue-300/50"
                initial={{ height: 0 }}
                animate={{ height: '40%' }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.div>
          
          {/* Control Panel */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <motion.div
              className={`w-4 h-4 rounded-full ${step >= 1 ? 'bg-green-400' : 'bg-slate-400'}`}
              animate={step >= 1 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: step >= 1 && step < 4 ? Infinity : 0, repeatDelay: 1 }}
            />
            <motion.div
              className={`w-4 h-4 rounded-full ${step >= 2 ? 'bg-blue-400' : 'bg-slate-400'}`}
            />
            <motion.div
              className={`w-4 h-4 rounded-full ${step >= 3 ? 'bg-yellow-400' : 'bg-slate-400'}`}
            />
          </div>
        </motion.div>
        
        {/* Button Press */}
        {step === 0 && (
          <motion.div
            className="absolute -right-16 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div
              className="text-4xl"
              animate={{ x: [-10, 0, -10] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              👆
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Explanation Steps */}
      <div className="text-center max-w-lg">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 0 && (
            <p className="text-lg text-foreground">
              <span className="font-bold text-primary">Step 1:</span> Press the button to start
            </p>
          )}
          {step === 1 && (
            <p className="text-lg text-foreground">
              <span className="font-bold text-primary">Step 2:</span> The machine follows <span className="font-bold">fixed rules</span>
            </p>
          )}
          {step === 2 && (
            <p className="text-lg text-foreground">
              <span className="font-bold text-primary">Step 3:</span> It <span className="font-bold">always</span> does the same thing - fill water, spin, drain
            </p>
          )}
          {step === 3 && (
            <p className="text-lg text-foreground">
              <span className="font-bold text-primary">Step 4:</span> It doesn't <span className="font-bold">learn</span> or adapt - it just follows instructions!
            </p>
          )}
          {step === 4 && (
            <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
              <p className="text-lg font-bold text-primary">
                🎯 Key Insight: Automation follows fixed rules - it doesn't learn!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
