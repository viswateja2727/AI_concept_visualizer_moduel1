import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const RuleBasedAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activePath, setActivePath] = useState<string[]>([]);
  
  useEffect(() => {
    if (!isPlaying) {
      setStep(0);
      setActiveNode(null);
      setActivePath([]);
      return;
    }
    
    const stepSequence = [
      { node: 'question', path: [] },
      { node: 'sunny', path: ['sunny-line'] },
      { node: 'windy', path: ['sunny-line', 'windy-line'] },
      { node: 'stay-home', path: ['sunny-line', 'windy-line', 'stay-line'] },
      { node: 'result', path: ['sunny-line', 'windy-line', 'stay-line'] },
    ];
    
    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < stepSequence.length) {
        setActiveNode(stepSequence[currentStep].node);
        setActivePath(stepSequence[currentStep].path);
        setStep(currentStep + 1);
        currentStep++;
      } else {
        // Restart the animation
        currentStep = 0;
        setStep(0);
        setActiveNode(null);
        setActivePath([]);
      }
    }, 2000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nodeClasses = (id: string) => `
    transition-all duration-500
    ${activeNode === id ? 'scale-110 shadow-xl' : 'scale-100'}
  `;

  const lineActive = (id: string) => activePath.includes(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-4">
      {/* 3D Decision Tree */}
      <div className="relative w-full max-w-2xl">
        {/* Main Question Node */}
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 top-0 ${nodeClasses('question')}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ perspective: '1000px' }}
        >
          <div className="relative">
            <div className="w-44 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center shadow-lg border-2 border-secondary/30 transform rotate-x-10">
              <span className="text-secondary-foreground font-bold text-center px-2">
                Is it sunny outside?
              </span>
            </div>
            {/* 3D effect shadow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-4 bg-secondary/30 rounded-full blur-md" />
          </div>
        </motion.div>

        {/* Lines from Question */}
        <svg className="absolute top-14 left-0 w-full h-24" viewBox="0 0 400 100">
          {/* Left line - Yes */}
          <motion.path
            d="M 200 10 Q 100 50 80 90"
            stroke={lineActive('sunny-line') ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground))'}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.text
            x="120"
            y="50"
            fill={lineActive('sunny-line') ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground))'}
            className="text-sm font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0.5 }}
          >
            YES ✓
          </motion.text>
          
          {/* Right line - No */}
          <motion.path
            d="M 200 10 Q 300 50 320 90"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            opacity={0.4}
          />
          <text x="270" y="50" fill="hsl(var(--muted-foreground))" className="text-sm" opacity={0.5}>
            NO ✗
          </text>
        </svg>

        {/* Second Level - Sunny Node */}
        <motion.div
          className={`absolute left-16 top-36 ${nodeClasses('sunny')}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: step >= 2 ? 1 : 0.3, scale: step >= 2 ? 1 : 0.8 }}
        >
          <div className="relative">
            <div className="w-36 h-14 bg-gradient-to-br from-success to-success/80 rounded-xl flex items-center justify-center shadow-lg border-2 border-success/30">
              <span className="text-success-foreground font-bold text-center text-sm px-2">
                Is it windy?
              </span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-success/30 rounded-full blur-md" />
          </div>
        </motion.div>

        {/* Grayed out No branch */}
        <motion.div
          className="absolute right-16 top-36 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        >
          <div className="w-36 h-14 bg-muted rounded-xl flex items-center justify-center border-2 border-border">
            <span className="text-muted-foreground font-medium text-sm">
              Stay inside 🏠
            </span>
          </div>
        </motion.div>

        {/* Lines from Sunny */}
        <svg className="absolute top-48 left-0 w-full h-20" viewBox="0 0 400 80">
          {/* Left line - Yes (Windy) */}
          <motion.path
            d="M 95 10 Q 60 40 50 70"
            stroke={lineActive('windy-line') ? 'hsl(var(--warning))' : 'hsl(var(--muted-foreground))'}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= 3 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.text
            x="50"
            y="45"
            fill={lineActive('windy-line') ? 'hsl(var(--warning))' : 'hsl(var(--muted-foreground))'}
            className="text-xs font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0.5 }}
          >
            YES
          </motion.text>
          
          {/* Right line - No */}
          <motion.path
            d="M 95 10 Q 130 40 145 70"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity={0.4}
          />
        </svg>

        {/* Third Level - Windy Result */}
        <motion.div
          className={`absolute left-4 top-64 ${nodeClasses('windy')}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: step >= 3 ? 1 : 0.3, scale: step >= 3 ? 1 : 0.8 }}
        >
          <div className="relative">
            <div className="w-32 h-12 bg-gradient-to-br from-warning to-warning/80 rounded-xl flex items-center justify-center shadow-lg border-2 border-warning/30">
              <span className="text-warning-foreground font-bold text-sm">
                Take jacket?
              </span>
            </div>
          </div>
        </motion.div>

        {/* Lines from Windy to Stay Home */}
        <svg className="absolute top-72 left-0 w-full h-16" viewBox="0 0 400 60">
          <motion.path
            d="M 68 10 L 68 50"
            stroke={lineActive('stay-line') ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= 4 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.text
            x="78"
            y="35"
            fill={lineActive('stay-line') ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
            className="text-xs font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0.5 }}
          >
            YES ✓
          </motion.text>
        </svg>

        {/* Final Result */}
        <motion.div
          className={`absolute left-4 top-[340px] ${nodeClasses('stay-home')}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: step >= 4 ? 1 : 0.3, scale: step >= 4 ? 1 : 0.8 }}
        >
          <div className="relative">
            <div className="w-32 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl border-2 border-primary/30">
              <span className="text-primary-foreground font-bold text-center text-sm">
                Take a jacket! 🧥
              </span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-primary/30 rounded-full blur-md" />
          </div>
        </motion.div>

        {/* Grayed out alternatives */}
        <motion.div
          className="absolute left-32 top-64 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        >
          <div className="w-28 h-10 bg-muted rounded-lg flex items-center justify-center border border-border">
            <span className="text-muted-foreground text-xs">Go outside! ☀️</span>
          </div>
        </motion.div>

        {/* Rules Box */}
        <motion.div
          className="absolute right-4 top-36 bg-card rounded-2xl p-4 shadow-lg border-2 border-border w-44"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h4 className="text-sm font-bold mb-3 text-foreground flex items-center gap-2">
            <div className="w-6 h-6 bg-bubble-2 rounded-lg flex items-center justify-center">
              <span className="text-xs">📋</span>
            </div>
            IF-THEN Rules
          </h4>
          <div className="space-y-2">
            <motion.div
              className={`p-2 rounded-lg text-xs transition-all ${step >= 2 ? 'bg-success/20 border border-success/40' : 'bg-muted/50'}`}
              animate={{ scale: step === 2 ? 1.02 : 1 }}
            >
              <span className="font-mono text-success">IF sunny</span>
              <br />
              <span className="font-mono text-muted-foreground">→ check wind</span>
            </motion.div>
            <motion.div
              className={`p-2 rounded-lg text-xs transition-all ${step >= 3 ? 'bg-warning/20 border border-warning/40' : 'bg-muted/50'}`}
              animate={{ scale: step === 3 ? 1.02 : 1 }}
            >
              <span className="font-mono text-warning">IF windy</span>
              <br />
              <span className="font-mono text-muted-foreground">→ check jacket</span>
            </motion.div>
            <motion.div
              className={`p-2 rounded-lg text-xs transition-all ${step >= 4 ? 'bg-primary/20 border border-primary/40' : 'bg-muted/50'}`}
              animate={{ scale: step === 4 ? 1.02 : 1 }}
            >
              <span className="font-mono text-primary">IF yes</span>
              <br />
              <span className="font-mono text-muted-foreground">→ take jacket!</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Explanation */}
      <motion.div
        className="mt-8 text-center max-w-lg px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {step < 5 ? (
          <p className="text-base text-foreground">
            A <span className="font-bold text-primary">decision tree</span> follows{' '}
            <span className="font-bold text-secondary">IF-THEN rules</span>.
            Watch how it follows the path based on each answer!
          </p>
        ) : (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-base font-bold text-primary">
              🎯 Rule-based systems are NOT AI - they don't learn from experience!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
