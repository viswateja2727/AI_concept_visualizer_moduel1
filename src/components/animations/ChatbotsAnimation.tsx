import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export const ChatbotsAnimation = ({ isPlaying }: Props) => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  
  const conversation = [
    { text: "Hi! I need help with my order 📦", isBot: false },
    { text: "Hello! I'd be happy to help! What's your order number? 😊", isBot: true },
    { text: "It's #12345", isBot: false },
    { text: "Found it! Your order ships tomorrow and arrives Friday! 🚚", isBot: true },
  ];
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(prev => (prev < 6 ? prev + 1 : prev));
    }, 2000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step >= 1 && step <= 4 && messages.length < step) {
      setMessages(prev => [...prev, conversation[prev.length]]);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px]">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Chatbots: Your AI Helper 🤝
      </h3>
      
      {/* Chat Window */}
      <motion.div
        className="w-full max-w-md bg-card rounded-2xl border-2 border-border overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 bg-primary text-white">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <p className="font-bold">Support Bot</p>
            <p className="text-xs opacity-80">Online - Replies instantly</p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[200px]">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.isBot 
                  ? 'bg-muted rounded-bl-sm' 
                  : 'bg-primary text-white rounded-br-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          {step >= 1 && step < 4 && messages.length < 4 && messages.length % 2 === 0 && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Stats */}
      {step >= 5 && (
        <motion.div
          className="flex gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-3 bg-success/20 rounded-xl text-center">
            <p className="text-2xl font-bold text-success">80%</p>
            <p className="text-xs text-muted-foreground">Questions solved</p>
          </div>
          <div className="p-3 bg-primary/20 rounded-xl text-center">
            <p className="text-2xl font-bold text-primary">24/7</p>
            <p className="text-xs text-muted-foreground">Always available</p>
          </div>
          <div className="p-3 bg-warning/20 rounded-xl text-center">
            <p className="text-2xl font-bold text-warning">&lt;1s</p>
            <p className="text-xs text-muted-foreground">Response time</p>
          </div>
        </motion.div>
      )}
      
      {/* Explanation */}
      <motion.div
        className="text-center max-w-lg mt-4"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step >= 6 && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎯 Chatbots use Language Models to understand and help users instantly!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
