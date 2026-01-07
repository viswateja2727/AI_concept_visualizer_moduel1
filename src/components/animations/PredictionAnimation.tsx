import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const PredictionAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [prediction, setPrediction] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 3) {
      const predTimer = setInterval(() => {
        setPrediction(prev => Math.min(prev + 2, 85));
      }, 100);
      return () => clearInterval(predTimer);
    }
  }, [step]);

  const historicalData = [
    { day: 'Mon', temp: 22, icon: '☀️' },
    { day: 'Tue', temp: 24, icon: '⛅' },
    { day: 'Wed', temp: 21, icon: '🌤️' },
    { day: 'Thu', temp: 26, icon: '☀️' },
    { day: 'Fri', temp: 28, icon: '🔥' },
    { day: '???', temp: prediction > 0 ? Math.round(27 + prediction/10) : null, icon: step >= 4 ? '📊' : '❓' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Predicting Tomorrow's Weather 🌤️
      </h3>
      
      {/* Temperature Chart */}
      <div className="flex items-end gap-3 mb-8 h-40">
        {historicalData.map((data, index) => (
          <motion.div
            key={data.day}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: step >= 1 ? 1 : 0.3,
              y: 0
            }}
            transition={{ delay: index * 0.15 }}
          >
            {/* Bar */}
            <motion.div
              className={`w-12 rounded-t-lg ${
                index === 5 
                  ? 'bg-gradient-to-t from-primary to-primary/60' 
                  : 'bg-gradient-to-t from-blue-400 to-blue-300'
              }`}
              initial={{ height: 0 }}
              animate={{ 
                height: data.temp ? `${data.temp * 3}px` : step >= 3 ? '90px' : '0px'
              }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
            
            {/* Temperature */}
            <motion.p
              className={`text-sm font-bold mt-1 ${index === 5 ? 'text-primary' : 'text-foreground'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {data.temp ? `${data.temp}°` : (step >= 4 ? `${Math.round(27 + prediction/10)}°` : '?')}
            </motion.p>
            
            {/* Day */}
            <p className="text-xs text-muted-foreground">{data.day}</p>
            
            {/* Icon */}
            <span className="text-xl mt-1">{data.icon}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Pattern Detection */}
      {step >= 2 && (
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-3 bg-amber-100 rounded-xl border-2 border-amber-400">
            <p className="text-sm font-bold text-amber-700">📈 Pattern Found!</p>
            <p className="text-xs text-amber-600">Temperature rising +2° per day</p>
          </div>
          
          <motion.div
            className="text-3xl"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ➡️
          </motion.div>
          
          <div className="p-3 bg-primary/20 rounded-xl border-2 border-primary">
            <p className="text-sm font-bold text-primary">🔮 Prediction</p>
            <p className="text-xs text-primary/80">Tomorrow: ~{Math.round(27 + prediction/10)}°C</p>
          </div>
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
              🎯 Prediction models find patterns in past data to forecast the future!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
