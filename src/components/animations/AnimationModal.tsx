import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AIConcept } from '@/data/aiConcepts';
import { conceptIconMap } from '@/components/icons/ConceptIcons';
import { AutomationAnimation } from './AutomationAnimation';
import { RuleBasedAnimation } from './RuleBasedAnimation';
import { AIAnimation } from './AIAnimation';
import { InputAnimation } from './InputAnimation';
import { TrainingDataAnimation } from './TrainingDataAnimation';
import { AIModelAnimation } from './AIModelAnimation';
import { AIPipelineAnimation } from './AIPipelineAnimation';
import { PredictionAnimation } from './PredictionAnimation';
import { LanguageModelAnimation } from './LanguageModelAnimation';
import { LLMPipelineAnimation } from './LLMPipelineAnimation';
import { ComputerVisionAnimation } from './ComputerVisionAnimation';
import { SearchSystemsAnimation } from './SearchSystemsAnimation';
import { ChatbotsAnimation } from './ChatbotsAnimation';
import { GenerativeAIAnimation } from './GenerativeAIAnimation';
import { AgenticAIAnimation } from './AgenticAIAnimation';
import { AIEngineerAnimation } from './AIEngineerAnimation';

interface AnimationModalProps {
  concept: AIConcept | null;
  isOpen: boolean;
  onClose: () => void;
}

const animationComponents: Record<string, React.ComponentType<{ isPlaying: boolean }>> = {
  'automation': AutomationAnimation,
  'rule-based': RuleBasedAnimation,
  'ai': AIAnimation,
  'input': InputAnimation,
  'training-data': TrainingDataAnimation,
  'ai-model': AIModelAnimation,
  'ai-pipeline': AIPipelineAnimation,
  'prediction-models': PredictionAnimation,
  'language-models': LanguageModelAnimation,
  'llm-pipeline': LLMPipelineAnimation,
  'computer-vision': ComputerVisionAnimation,
  'search-systems': SearchSystemsAnimation,
  'chatbots': ChatbotsAnimation,
  'generative-ai': GenerativeAIAnimation,
  'agentic-ai': AgenticAIAnimation,
  'ai-engineer': AIEngineerAnimation,
};

export const AnimationModal = ({ concept, isOpen, onClose }: AnimationModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!concept) return null;

  const AnimationComponent = animationComponents[concept.id];
  const IconComponent = conceptIconMap[concept.id];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
              <div className="flex items-center gap-4">
                <div className="icon-bubble">
                  {IconComponent ? <IconComponent size={36} /> : <span className="text-3xl">{concept.icon}</span>}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-quicksand">
                    {concept.term}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {concept.category}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            {/* Animation Area - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative min-h-[400px] bg-gradient-to-b from-background to-card p-8">
                {/* Decorative shapes */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-bubble-1 rounded-full opacity-30" />
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-bubble-2 rounded-full opacity-30" />
                
                {!isPlaying ? (
                  /* Start Screen */
                  <motion.div
                    className="flex flex-col items-center justify-center h-full min-h-[350px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="mb-8"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {IconComponent ? <IconComponent size={96} /> : <span className="text-8xl">{concept.icon}</span>}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 text-center font-quicksand">
                      Ready to learn about {concept.term}?
                    </h3>
                    <p className="text-muted-foreground text-center max-w-md mb-8">
                      {concept.definition}
                    </p>
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="start-button text-lg px-8 py-3"
                    >
                      <span className="text-2xl">▶</span>
                      <span>Start Learning</span>
                    </button>
                  </motion.div>
                ) : (
                  /* Animation Content */
                  AnimationComponent && <AnimationComponent isPlaying={isPlaying} />
                )}
              </div>
              
              {/* Footer with examples - Inside scrollable area */}
              {concept.examples && concept.examples.length > 0 && (
                <div className="p-6 bg-muted/30 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3 font-quicksand flex items-center gap-2">
                    <div className="w-6 h-6 bg-warning/20 rounded-lg flex items-center justify-center">
                      <span className="text-warning text-xs">💡</span>
                    </div>
                    Real-world examples:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.examples.map((example, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-card text-sm text-muted-foreground border border-border"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
