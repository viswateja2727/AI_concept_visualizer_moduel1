import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { AIConcept } from '@/data/aiConcepts';
import { conceptIconMap } from '@/components/icons/ConceptIcons';

interface ConceptCardProps {
  concept: AIConcept;
  index: number;
  onStart: (concept: AIConcept) => void;
}

export const ConceptCard = ({ concept, index, onStart }: ConceptCardProps) => {
  const IconComponent = conceptIconMap[concept.id];

  return (
    <motion.div
      className="concept-card p-6 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Decorative stars */}
      <div className="absolute top-3 right-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 9L20 10L13.5 11L12 18L10.5 11L4 10L10.5 9L12 2Z" fill="hsl(var(--warning))" opacity="0.7" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 9L20 10L13.5 11L12 18L10.5 11L4 10L10.5 9L12 2Z" fill="hsl(var(--warning))" opacity="0.5" />
        </svg>
      </div>
      
      {/* Decorative corner shape */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-bubble-1 rounded-tl-[60px] opacity-30" />
      
      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div className="icon-bubble shrink-0">
          {IconComponent ? <IconComponent size={36} /> : <span className="text-3xl">{concept.icon}</span>}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground mb-1 font-quicksand">
            {concept.term}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {concept.definition}
          </p>
        </div>
      </div>
      
      {/* Start Button */}
      <div className="flex justify-end mt-4 relative z-10">
        <button
          onClick={() => onStart(concept)}
          className="start-button"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{concept.buttonText}</span>
        </button>
      </div>
    </motion.div>
  );
};
