import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const AIEngineerAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 6 ? prev + 1 : prev));
    }, 2200);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const projects = [
    { icon: '🎬', name: 'Netflix Recommendations', desc: 'What to watch next?' },
    { icon: '🏥', name: 'Medical Diagnosis', desc: 'Detecting diseases early' },
    { icon: '🚗', name: 'Self-Driving Cars', desc: 'Safe autonomous driving' },
  ];

  const skills = ['Python 🐍', 'Math 📐', 'Data 📊', 'ML Models 🧠'];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        AI Engineer: Building the Future 👩‍💻
      </h3>
      
      {/* Engineer at Work */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-4">
          {/* Laptop */}
          <motion.div
            className="relative"
            animate={step >= 1 ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-32 h-24 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-lg flex items-center justify-center">
              <motion.div
                className="text-3xl"
                animate={step >= 2 ? {
                  opacity: [0.5, 1, 0.5],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💻
              </motion.div>
            </div>
            <div className="w-36 h-3 bg-slate-600 rounded-b-lg -mt-1" />
          </motion.div>
          
          {/* Engineer */}
          <motion.div
            className="flex flex-col items-center"
            animate={step >= 1 ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-6xl">👩‍💻</span>
            <div className="mt-2 px-3 py-1 bg-primary/20 rounded-full">
              <span className="text-sm font-bold text-primary">AI Engineer</span>
            </div>
          </motion.div>
        </div>
        
        {/* Code floating */}
        {step >= 2 && (
          <>
            <motion.div
              className="absolute -top-4 -left-8 px-2 py-1 bg-slate-800 text-green-400 text-xs font-mono rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              model.train()
            </motion.div>
            <motion.div
              className="absolute -top-2 right-0 px-2 py-1 bg-slate-800 text-blue-400 text-xs font-mono rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              data.load()
            </motion.div>
          </>
        )}
      </motion.div>
      
      {/* Skills */}
      {step >= 3 && (
        <motion.div
          className="flex gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {skills.map((skill, i) => (
            <motion.span
              key={i}
              className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i, type: 'spring' }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      )}
      
      {/* Projects */}
      {step >= 4 && (
        <motion.div
          className="grid grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="p-4 bg-card rounded-xl border border-border text-center"
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 * i, type: 'spring' }}
            >
              <span className="text-3xl block">{project.icon}</span>
              <p className="text-xs font-bold text-foreground mt-2">{project.name}</p>
              <p className="text-[10px] text-muted-foreground">{project.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Salary Info */}
      {step >= 5 && (
        <motion.div
          className="flex gap-4 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="p-3 bg-success/20 rounded-xl text-center">
            <p className="text-xl font-bold text-success">$120,000+</p>
            <p className="text-xs text-muted-foreground">Average salary</p>
          </div>
          <div className="p-3 bg-primary/20 rounded-xl text-center">
            <p className="text-xl font-bold text-primary">🌍 Global</p>
            <p className="text-xs text-muted-foreground">High demand</p>
          </div>
          <div className="p-3 bg-warning/20 rounded-xl text-center">
            <p className="text-xl font-bold text-warning">📈 Growing</p>
            <p className="text-xs text-muted-foreground">Hot career</p>
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
        {step >= 6 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 AI Engineers build AI systems that solve real-world problems - and get paid well to do it!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
