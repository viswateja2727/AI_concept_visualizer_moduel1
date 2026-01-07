import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const ComputerVisionAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 2 && scanLine < 100) {
      const scanTimer = setInterval(() => {
        setScanLine(prev => Math.min(prev + 5, 100));
      }, 100);
      return () => clearInterval(scanTimer);
    }
  }, [step, scanLine]);

  const detectedFeatures = [
    { label: 'Whiskers', detected: scanLine > 30 },
    { label: 'Fur', detected: scanLine > 50 },
    { label: 'Ears', detected: scanLine > 70 },
    { label: 'Eyes', detected: scanLine > 90 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Computer Vision: AI That Sees 👁️
      </h3>
      
      <div className="flex items-center gap-8 mb-8">
        {/* Image being scanned */}
        <motion.div
          className="relative w-36 h-36 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden border-4 border-amber-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Cat image */}
          <div className="absolute inset-0 flex items-center justify-center text-8xl">
            🐱
          </div>
          
          {/* Scanning effect */}
          {step >= 2 && (
            <motion.div
              className="absolute left-0 right-0 h-1 bg-primary/80 shadow-lg shadow-primary"
              style={{ top: `${scanLine}%` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
          
          {/* Detection boxes */}
          {scanLine >= 80 && (
            <motion.div
              className="absolute inset-4 border-2 border-success rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="absolute -top-3 left-2 px-2 py-0.5 bg-success text-white text-xs rounded font-bold">
                CAT
              </span>
            </motion.div>
          )}
        </motion.div>
        
        {/* Processing */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="text-5xl"
            animate={step >= 2 ? { rotate: [0, 360] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ⚙️
          </motion.div>
          <p className="text-xs text-muted-foreground">Analyzing...</p>
        </motion.div>
        
        {/* Detected Features */}
        <motion.div
          className="bg-card rounded-2xl p-4 border-2 border-border"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-sm font-bold mb-3 text-foreground">Features Found:</h4>
          <div className="space-y-2">
            {detectedFeatures.map((feature, i) => (
              <motion.div
                key={feature.label}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                  feature.detected ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                }`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <span>{feature.detected ? '✓' : '○'}</span>
                <span>{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Real World Examples */}
      {step >= 4 && (
        <motion.div
          className="flex gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { icon: '🚗', label: 'Self-driving cars' },
            { icon: '🏥', label: 'Medical scans' },
            { icon: '📱', label: 'Face unlock' },
          ].map((example, i) => (
            <motion.div
              key={i}
              className="p-3 bg-muted rounded-xl text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 * i }}
            >
              <span className="text-2xl block">{example.icon}</span>
              <p className="text-xs text-muted-foreground mt-1">{example.label}</p>
            </motion.div>
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
              🎯 Computer Vision enables AI to see and understand images like humans do!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
