import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingShapes } from '@/components/FloatingShapes';
import { CategorySection } from '@/components/CategorySection';
import { AnimationModal } from '@/components/animations/AnimationModal';
import { conceptCategories, type AIConcept } from '@/data/aiConcepts';

const Index = () => {
  const [selectedConcept, setSelectedConcept] = useState<AIConcept | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartConcept = (concept: AIConcept) => {
    setSelectedConcept(concept);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedConcept(null), 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingShapes />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-5xl">🤖</span>
            <span className="text-5xl">🧠</span>
            <span className="text-5xl">✨</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-quicksand">
            Learn AI Concepts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the world of Artificial Intelligence through fun, interactive animations! 
            Click "Start" on any concept to begin learning.
          </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <div className="px-4 py-2 bg-card rounded-full border border-border shadow-sm">
              <span className="text-sm text-muted-foreground">
                📚 <strong className="text-foreground">15</strong> concepts to explore
              </span>
            </div>
            <div className="px-4 py-2 bg-card rounded-full border border-border shadow-sm">
              <span className="text-sm text-muted-foreground">
                🎯 <strong className="text-foreground">5</strong> categories
              </span>
            </div>
          </div>
        </motion.header>

        {/* Categories */}
        <main>
          {conceptCategories.map((category, index) => (
            <CategorySection
              key={category.id}
              category={category}
              categoryIndex={index}
              onStartConcept={handleStartConcept}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 mt-8">
          <p className="text-sm text-muted-foreground">
            Made with 💙 for curious minds learning AI
          </p>
        </footer>
      </div>

      {/* Animation Modal */}
      <AnimationModal
        concept={selectedConcept}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
