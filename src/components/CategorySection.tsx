import { motion } from 'framer-motion';
import { ConceptCard } from './ConceptCard';
import type { ConceptCategory, AIConcept } from '@/data/aiConcepts';

interface CategorySectionProps {
  category: ConceptCategory;
  categoryIndex: number;
  onStartConcept: (concept: AIConcept) => void;
}

const colorClasses = {
  coral: 'category-badge-coral',
  teal: 'bg-primary text-white',
  purple: 'bg-secondary text-secondary-foreground',
  amber: 'bg-warning text-white',
};

export const CategorySection = ({ category, categoryIndex, onStartConcept }: CategorySectionProps) => {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className={`category-badge ${colorClasses[category.color]}`}>
          {category.name}
        </span>
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">
          {category.concepts.length} concepts
        </span>
      </div>
      
      {/* Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.concepts.map((concept, index) => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            index={index}
            onStart={onStartConcept}
          />
        ))}
      </div>
    </motion.section>
  );
};
