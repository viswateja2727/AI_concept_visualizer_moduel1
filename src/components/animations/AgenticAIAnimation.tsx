import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const AgenticAIAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 7 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const taskSteps = [
    { icon: '🎯', action: 'Understanding task', detail: '"Book a trip to Paris"' },
    { icon: '🔍', action: 'Searching flights', detail: 'Finding best prices...' },
    { icon: '🏨', action: 'Booking hotel', detail: 'Selecting 4-star hotels...' },
    { icon: '📅', action: 'Creating schedule', detail: 'Optimizing itinerary...' },
    { icon: '✅', action: 'Task complete!', detail: 'Trip booked!' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Agentic AI: AI That Takes Action 🚀
      </h3>
      
      {/* Agent Visualization */}
      <div className="flex items-center gap-8 mb-8">
        {/* User Request */}
        <motion.div
          className="p-4 bg-blue-100 rounded-2xl border-2 border-blue-300"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-3xl block text-center">👤</span>
          <p className="text-sm font-bold mt-2">"Plan my Paris trip"</p>
        </motion.div>
        
        {/* Agent Brain */}
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center"
            animate={step >= 1 ? {
              boxShadow: [
                '0 0 0px rgba(20, 184, 166, 0)',
                '0 0 40px rgba(20, 184, 166, 0.6)',
                '0 0 0px rgba(20, 184, 166, 0)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="text-5xl"
              animate={step >= 1 ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🤖
            </motion.span>
          </motion.div>
          
          {/* Thinking indicator */}
          {step >= 1 && step < 6 && (
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              💭
            </motion.div>
          )}
        </motion.div>
        
        {/* Tools/Apps */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {['✈️ Flights', '🏨 Hotels', '📅 Calendar'].map((tool, i) => (
            <motion.div
              key={i}
              className={`px-3 py-2 rounded-lg text-sm ${
                step > i + 1 ? 'bg-success/20 border-2 border-success' : 'bg-muted border border-border'
              }`}
              animate={step === i + 2 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: step === i + 2 ? Infinity : 0 }}
            >
              {tool} {step > i + 1 && '✓'}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Task Progress */}
      <div className="w-full max-w-md mb-6">
        {taskSteps.slice(0, Math.min(step, 5)).map((taskStep, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 p-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <span className="text-2xl">{taskStep.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">{taskStep.action}</p>
              <p className="text-xs text-muted-foreground">{taskStep.detail}</p>
            </div>
            <span className="text-success">✓</span>
          </motion.div>
        ))}
      </div>
      
      {/* Warning */}
      {step >= 6 && (
        <motion.div
          className="p-4 bg-amber-100 rounded-xl border-2 border-amber-400 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-amber-800">
            <span className="font-bold">⚠️ Note:</span> Agentic AI is still emerging - it needs human oversight for important tasks!
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
        {step >= 7 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Agentic AI can plan steps and use multiple tools to complete complex tasks!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
