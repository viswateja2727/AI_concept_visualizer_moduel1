import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const RuleBasedAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [lightColor, setLightColor] = useState<'red' | 'yellow' | 'green'>('red');
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const stepTimer = setInterval(() => {
      setStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 2500);
    
    return () => clearInterval(stepTimer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 2) {
      const lightTimer = setInterval(() => {
        setLightColor(prev => {
          if (prev === 'red') return 'green';
          if (prev === 'green') return 'yellow';
          return 'red';
        });
      }, 1500);
      return () => clearInterval(lightTimer);
    }
  }, [step]);

  const rules = [
    { condition: 'IF timer = 60s', action: 'THEN switch to GREEN', icon: '🟢' },
    { condition: 'IF timer = 50s', action: 'THEN switch to YELLOW', icon: '🟡' },
    { condition: 'IF timer = 0s', action: 'THEN switch to RED', icon: '🔴' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <div className="flex items-center gap-12">
        {/* Traffic Light */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Pole */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4 h-16 bg-slate-600" />
          
          {/* Light Box */}
          <div className="w-20 h-52 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl p-3 flex flex-col gap-3 shadow-xl">
            {/* Red Light */}
            <motion.div
              className={`w-14 h-14 rounded-full border-4 border-slate-600 ${
                lightColor === 'red' ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900/50'
              }`}
              animate={lightColor === 'red' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: lightColor === 'red' ? Infinity : 0 }}
            />
            {/* Yellow Light */}
            <motion.div
              className={`w-14 h-14 rounded-full border-4 border-slate-600 ${
                lightColor === 'yellow' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-yellow-900/50'
              }`}
              animate={lightColor === 'yellow' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: lightColor === 'yellow' ? Infinity : 0 }}
            />
            {/* Green Light */}
            <motion.div
              className={`w-14 h-14 rounded-full border-4 border-slate-600 ${
                lightColor === 'green' ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-green-900/50'
              }`}
              animate={lightColor === 'green' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: lightColor === 'green' ? Infinity : 0 }}
            />
          </div>
        </motion.div>
        
        {/* Rules Box */}
        <motion.div
          className="bg-card rounded-2xl p-6 shadow-lg border-2 border-border"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h4 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
            📋 Fixed Rules
          </h4>
          <div className="space-y-3">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0.3, x: 0 }}
                transition={{ delay: 0.5 + index * 0.3 }}
              >
                <span className="text-2xl">{rule.icon}</span>
                <div className="text-sm">
                  <span className="font-mono text-primary">{rule.condition}</span>
                  <br />
                  <span className="font-mono text-muted-foreground">{rule.action}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Explanation */}
      <motion.div
        className="mt-8 text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {step < 4 ? (
          <p className="text-lg text-foreground">
            The traffic light follows <span className="font-bold text-primary">IF-THEN rules</span>.
            It doesn't think or learn - it just follows instructions!
          </p>
        ) : (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Rule-based systems are NOT AI - they don't learn from experience!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
