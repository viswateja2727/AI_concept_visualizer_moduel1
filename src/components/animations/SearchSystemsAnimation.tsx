import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const SearchSystemsAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fullQuery = "best pizza recipes";
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 1 && searchQuery.length < fullQuery.length) {
      const typeTimer = setInterval(() => {
        setSearchQuery(prev => fullQuery.slice(0, prev.length + 1));
      }, 100);
      return () => clearInterval(typeTimer);
    }
  }, [step, searchQuery]);

  const searchResults = [
    { title: 'Classic Margherita Pizza 🍕', rank: 1 },
    { title: 'Easy Homemade Pizza Dough', rank: 2 },
    { title: 'Best Pizza Toppings Guide', rank: 3 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Search Systems: AI-Powered Finding 🔍
      </h3>
      
      {/* Search Box */}
      <motion.div
        className="w-full max-w-md mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 p-4 bg-card rounded-2xl border-2 border-border shadow-lg">
          <span className="text-2xl">🔍</span>
          <div className="flex-1">
            <p className="text-foreground">
              {searchQuery}
              {step >= 1 && searchQuery.length < fullQuery.length && (
                <motion.span
                  className="inline-block w-2 h-5 bg-primary ml-0.5"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </p>
          </div>
          <motion.button
            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold"
            animate={step >= 2 ? { scale: [1, 0.95, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            Search
          </motion.button>
        </div>
      </motion.div>
      
      {/* AI Processing */}
      {step >= 2 && (
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="p-3 bg-primary/20 rounded-xl">
            <motion.span
              className="text-3xl block"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: step < 3 ? Infinity : 0, ease: 'linear' }}
            >
              🧠
            </motion.span>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-bold text-foreground">AI is helping:</p>
            <p>• Understanding your intent</p>
            <p>• Ranking best results</p>
          </div>
        </motion.div>
      )}
      
      {/* Search Results */}
      {step >= 3 && (
        <motion.div
          className="w-full max-w-md space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {searchResults.map((result, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {result.rank}
              </span>
              <p className="text-foreground text-sm font-medium">{result.title}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Key Difference */}
      {step >= 4 && (
        <motion.div
          className="mt-6 p-4 bg-amber-100 rounded-xl border-2 border-amber-400"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-amber-800">
            <span className="font-bold">Important:</span> Search finds existing content - it's a "finder," not a "creator"!
          </p>
        </motion.div>
      )}
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg mt-4"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step >= 5 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Search systems use AI to find and rank the best existing information!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
