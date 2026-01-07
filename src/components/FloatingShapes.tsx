import { motion } from 'framer-motion';

const shapes = [
  { color: 'bg-bubble-1', size: 'w-32 h-32', left: '5%', top: '10%', delay: 0 },
  { color: 'bg-bubble-2', size: 'w-24 h-24', left: '85%', top: '15%', delay: 1 },
  { color: 'bg-bubble-3', size: 'w-20 h-20', left: '75%', top: '60%', delay: 2 },
  { color: 'bg-bubble-4', size: 'w-28 h-28', left: '10%', top: '70%', delay: 1.5 },
  { color: 'bg-bubble-1', size: 'w-16 h-16', left: '50%', top: '5%', delay: 0.5 },
  { color: 'bg-bubble-2', size: 'w-12 h-12', left: '30%', top: '80%', delay: 2.5 },
];

export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${shape.color} ${shape.size} opacity-40 blur-sm`}
          style={{ left: shape.left, top: shape.top }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Star decorations */}
      <motion.div
        className="absolute text-4xl"
        style={{ left: '20%', top: '25%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute text-2xl"
        style={{ left: '80%', top: '40%' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute text-3xl"
        style={{ left: '60%', top: '85%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, delay: 0.5, repeat: Infinity }}
      >
        ⭐
      </motion.div>
    </div>
  );
};
