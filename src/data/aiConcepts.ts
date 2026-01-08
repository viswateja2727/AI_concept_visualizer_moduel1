// AI Concepts organized by learning order - first things first

export interface AIConcept {
  id: string;
  term: string;
  definition: string;
  icon: string;
  category: string;
  order: number;
  buttonText: string;
  animationType: 'comparison' | 'flow' | 'visual' | 'example' | 'process';
  examples?: string[];
}

export interface ConceptCategory {
  id: string;
  name: string;
  color: 'coral' | 'teal' | 'purple' | 'amber';
  concepts: AIConcept[];
}

export const aiConcepts: AIConcept[] = [
  // Category 1: Foundation - What is AI vs What is NOT AI
  {
    id: 'automation',
    term: 'Automation',
    definition: 'A system that follows fixed instructions or "if-then" rules to produce the same output every time. It does not learn or adapt from data.',
    icon: '⚙️',
    category: 'Foundation',
    order: 1,
    buttonText: 'See Automation',
    animationType: 'comparison',
    examples: ['A washing machine always runs the same cycle', 'A calculator gives the same answer for 2+2']
  },
  {
    id: 'rule-based',
    term: 'Rule-Based Systems',
    definition: 'Systems that operate on fixed "if-then" rules and do not learn. Examples include calculators and old traffic lights. They are considered automation, not AI.',
    icon: '📋',
    category: 'Foundation',
    order: 2,
    buttonText: 'Explore Rules',
    animationType: 'flow',
    examples: ['If light is red, then stop', 'If password wrong, then show error']
  },
  {
    id: 'ai',
    term: 'AI (Artificial Intelligence)',
    definition: 'An umbrella term for systems that learn patterns from data to make predictions or decisions, as opposed to simply following fixed instructions.',
    icon: '🧠',
    category: 'Foundation',
    order: 3,
    buttonText: 'Discover AI',
    animationType: 'visual',
    examples: ['Learning to recognize cats from thousands of photos', 'Predicting weather from past patterns']
  },
  
  // Category 2: Core Components - The Building Blocks
  {
    id: 'input',
    term: 'Input',
    definition: 'The data fed into an AI system for processing. This can be in the form of images, text, or numbers.',
    icon: '📥',
    category: 'Core Components',
    order: 4,
    buttonText: 'See Inputs',
    animationType: 'example',
    examples: ['A photo you upload', 'A question you type', 'Temperature readings from sensors']
  },
  {
    id: 'training-data',
    term: 'Training Data',
    definition: 'The collection of examples that an AI model learns from. For example, a Computer Vision model would be trained on a photo database, while a Language Model might use a news database.',
    icon: '📚',
    category: 'Core Components',
    order: 5,
    buttonText: 'Start Training',
    animationType: 'process',
    examples: ['Millions of cat and dog photos with labels', 'Thousands of medical X-rays reviewed by doctors']
  },
  {
    id: 'ai-model',
    term: 'AI Model',
    definition: 'The "brain" of the AI system that processes data. Different models are used for different tasks, such as Computer Vision, Language Models, and Prediction Models.',
    icon: '🤖',
    category: 'Core Components',
    order: 6,
    buttonText: 'Meet the Model',
    animationType: 'visual',
    examples: ['GPT for understanding text', 'YOLO for detecting objects in images']
  },
  {
    id: 'ai-pipeline',
    term: 'AI Pipeline',
    definition: 'The fundamental structure of every AI system, consisting of three key ingredients: Input, an AI Model, and Training Data.',
    icon: '🔄',
    category: 'Core Components',
    order: 7,
    buttonText: 'Build Pipeline',
    animationType: 'flow',
    examples: ['Photo → Image Model → "This is a cat"', 'Question → Language Model → Answer']
  },
  
  // Category 3: Types of AI Models
  {
    id: 'prediction-models',
    term: 'Prediction Models',
    definition: 'A type of AI model that finds patterns in historical numerical data to forecast future outcomes. It is used to predict events like wildfires, floods, and energy usage patterns.',
    icon: '📊',
    category: 'Model Types',
    order: 8,
    buttonText: 'Make Predictions',
    animationType: 'process',
    examples: ['Predicting tomorrow\'s weather', 'Forecasting stock prices', 'Estimating traffic congestion']
  },
  {
    id: 'language-models',
    term: 'Language Models',
    definition: 'A type of AI model that is taught to "read and write" by processing text. Applications include fake news detection, translation services, and chatbots.',
    icon: '💬',
    category: 'Model Types',
    order: 9,
    buttonText: 'Learn Language',
    animationType: 'example',
    examples: ['ChatGPT answering questions', 'Google Translate', 'Auto-complete on your phone']
  },
  {
    id: 'computer-vision',
    term: 'Computer Vision',
    definition: 'A type of AI model that is taught to "see" by processing images. It is used for tasks like detecting plastic in oceans, identifying tumors in X-rays, and enabling self-driving cars.',
    icon: '👁️',
    category: 'Model Types',
    order: 11,
    buttonText: 'See Vision',
    animationType: 'visual',
    examples: ['Face unlock on phones', 'Self-driving cars detecting pedestrians', 'Medical scan analysis']
  },
  
  // Category 4: AI Applications
  {
    id: 'search-systems',
    term: 'Search / Retrieval Systems',
    definition: 'Systems whose main job is to find and retrieve existing information. Modern search engines use AI internally to rank results and understand user intent but are primarily "finders," not "creators."',
    icon: '🔍',
    category: 'Applications',
    order: 11,
    buttonText: 'Try Search',
    animationType: 'flow',
    examples: ['Google Search finding relevant websites', 'Finding songs with Shazam']
  },
  {
    id: 'chatbots',
    term: 'Chatbots',
    definition: 'AI systems, often using Language Models, designed to interact with users and answer questions. AI chatbots can solve up to 80% of customer questions instantly.',
    icon: '🤝',
    category: 'Applications',
    order: 12,
    buttonText: 'Chat Now',
    animationType: 'example',
    examples: ['Customer support on websites', 'Siri, Alexa, and Google Assistant', 'ChatGPT']
  },
  {
    id: 'generative-ai',
    term: 'Generative AI',
    definition: 'A type of AI that creates new, original content such as text, images, audio, or code based on patterns it has learned from training data.',
    icon: '✨',
    category: 'Applications',
    order: 13,
    buttonText: 'Create Magic',
    animationType: 'visual',
    examples: ['DALL-E creating images from descriptions', 'ChatGPT writing stories', 'AI composing music']
  },
  {
    id: 'agentic-ai',
    term: 'Agentic AI',
    definition: 'An emerging type of AI that can plan steps and take actions across different applications and tools to complete a task for a user. It is not yet fully reliable and requires human safeguards.',
    icon: '🚀',
    category: 'Applications',
    order: 14,
    buttonText: 'Meet Agents',
    animationType: 'process',
    examples: ['AI assistant booking flights and hotels', 'AI that can browse the web and fill forms']
  },
  
  // Category 5: Career
  {
    id: 'ai-engineer',
    term: 'AI Engineer',
    definition: 'A professional who designs AI pipelines to solve real-world problems. The career has extremely high worldwide demand with salaries of $120,000+ per year.',
    icon: '👩‍💻',
    category: 'Career',
    order: 15,
    buttonText: 'Explore Career',
    animationType: 'flow',
    examples: ['Building recommendation systems for Netflix', 'Creating medical diagnosis tools', 'Developing autonomous vehicles']
  }
];

export const conceptCategories: ConceptCategory[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    color: 'coral',
    concepts: aiConcepts.filter(c => c.category === 'Foundation').sort((a, b) => a.order - b.order)
  },
  {
    id: 'core-components',
    name: 'Core Components',
    color: 'teal',
    concepts: aiConcepts.filter(c => c.category === 'Core Components').sort((a, b) => a.order - b.order)
  },
  {
    id: 'model-types',
    name: 'Model Types',
    color: 'purple',
    concepts: aiConcepts.filter(c => c.category === 'Model Types').sort((a, b) => a.order - b.order)
  },
  {
    id: 'applications',
    name: 'Applications',
    color: 'amber',
    concepts: aiConcepts.filter(c => c.category === 'Applications').sort((a, b) => a.order - b.order)
  },
  {
    id: 'career',
    name: 'Career',
    color: 'coral',
    concepts: aiConcepts.filter(c => c.category === 'Career').sort((a, b) => a.order - b.order)
  }
];
