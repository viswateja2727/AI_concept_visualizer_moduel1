import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
}

// Automation - Gears
export const AutomationIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-1))" />
    <path d="M24 16L26 18L24 20L22 18L24 16Z" fill="hsl(var(--primary))" />
    <circle cx="24" cy="24" r="6" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
    <path d="M24 14V18M24 30V34M34 24H30M18 24H14M31 17L28 20M20 28L17 31M17 17L20 20M28 28L31 31" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Rule-Based - Decision Tree
export const RuleBasedIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-2))" />
    <rect x="19" y="8" width="10" height="8" rx="2" fill="hsl(var(--secondary))" />
    <rect x="8" y="32" width="10" height="8" rx="2" fill="hsl(var(--success))" />
    <rect x="30" y="32" width="10" height="8" rx="2" fill="hsl(var(--warning))" />
    <path d="M24 16V22L14 28V32M24 22L34 28V32" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// AI Brain
export const AIBrainIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-3))" />
    <path d="M24 10C18 10 13 15 13 21C13 25 15 28 18 30V36H30V30C33 28 35 25 35 21C35 15 30 10 24 10Z" fill="hsl(var(--accent))" />
    <path d="M18 22H30M18 26H30" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="18" r="2" fill="white" />
    <circle cx="28" cy="18" r="2" fill="white" />
  </svg>
);

// Input - Arrow into box
export const InputIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-1))" />
    <rect x="18" y="18" width="18" height="18" rx="3" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--card))" />
    <path d="M10 27H20M20 27L16 23M20 27L16 31" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Training Data - Books/Database
export const TrainingDataIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-2))" />
    <rect x="12" y="12" width="24" height="6" rx="2" fill="hsl(var(--secondary))" />
    <rect x="12" y="21" width="24" height="6" rx="2" fill="hsl(var(--accent))" />
    <rect x="12" y="30" width="24" height="6" rx="2" fill="hsl(var(--primary))" />
  </svg>
);

// AI Model - Robot
export const AIModelIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-3))" />
    <rect x="14" y="16" width="20" height="20" rx="4" fill="hsl(var(--accent))" />
    <circle cx="19" cy="24" r="3" fill="white" />
    <circle cx="29" cy="24" r="3" fill="white" />
    <rect x="18" y="30" width="12" height="3" rx="1" fill="white" />
    <rect x="22" y="8" width="4" height="8" rx="2" fill="hsl(var(--accent))" />
  </svg>
);

// AI Pipeline - Flow arrows
export const AIPipelineIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-1))" />
    <circle cx="10" cy="24" r="4" fill="hsl(var(--primary))" />
    <circle cx="24" cy="24" r="6" fill="hsl(var(--accent))" />
    <circle cx="38" cy="24" r="4" fill="hsl(var(--success))" />
    <path d="M14 24H18M30 24H34" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 22L18 24L16 26M32 22L34 24L32 26" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Prediction - Chart trending up
export const PredictionIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-2))" />
    <path d="M10 34L18 26L24 30L38 16" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 16H38V24" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Language Model - Chat bubble
export const LanguageModelIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-3))" />
    <path d="M12 14H36C37.1 14 38 14.9 38 16V30C38 31.1 37.1 32 36 32H20L14 38V32H12C10.9 32 10 31.1 10 30V16C10 14.9 10.9 14 12 14Z" fill="hsl(var(--accent))" />
    <path d="M16 20H32M16 26H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Computer Vision - Eye
export const ComputerVisionIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-1))" />
    <ellipse cx="24" cy="24" rx="14" ry="10" fill="white" stroke="hsl(var(--primary))" strokeWidth="2" />
    <circle cx="24" cy="24" r="6" fill="hsl(var(--primary))" />
    <circle cx="24" cy="24" r="2" fill="white" />
  </svg>
);

// Search - Magnifying glass
export const SearchIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-2))" />
    <circle cx="22" cy="22" r="8" stroke="hsl(var(--secondary))" strokeWidth="3" fill="hsl(var(--card))" />
    <path d="M28 28L36 36" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Chatbots - Two chat bubbles
export const ChatbotsIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-3))" />
    <path d="M10 12H28C29.1 12 30 12.9 30 14V24C30 25.1 29.1 26 28 26H16L12 30V26H10C8.9 26 8 25.1 8 24V14C8 12.9 8.9 12 10 12Z" fill="hsl(var(--accent))" />
    <path d="M18 30H38C39.1 30 40 30.9 40 32V38C40 39.1 39.1 40 38 40H22L18 44V40H18C16.9 40 16 39.1 16 38V32C16 30.9 16.9 30 18 30Z" fill="hsl(var(--primary))" />
  </svg>
);

// Generative AI - Sparkles
export const GenerativeAIIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-1))" />
    <path d="M24 8L26 18L36 20L26 22L24 32L22 22L12 20L22 18L24 8Z" fill="hsl(var(--warning))" />
    <path d="M36 30L37 34L41 35L37 36L36 40L35 36L31 35L35 34L36 30Z" fill="hsl(var(--warning))" />
    <path d="M12 28L13 31L16 32L13 33L12 36L11 33L8 32L11 31L12 28Z" fill="hsl(var(--warning))" />
  </svg>
);

// Agentic AI - Robot with tools
export const AgenticAIIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-2))" />
    <circle cx="24" cy="20" r="10" fill="hsl(var(--secondary))" />
    <circle cx="20" cy="18" r="2" fill="white" />
    <circle cx="28" cy="18" r="2" fill="white" />
    <path d="M20 24H28" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 32L16 26M38 32L32 26" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="34" r="3" fill="hsl(var(--accent))" />
    <circle cx="38" cy="34" r="3" fill="hsl(var(--primary))" />
  </svg>
);

// AI Engineer - Person with code
export const AIEngineerIcon = ({ className, size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="20" fill="hsl(var(--bubble-3))" />
    <circle cx="24" cy="16" r="6" fill="hsl(var(--accent))" />
    <path d="M14 38C14 32 18.5 28 24 28C29.5 28 34 32 34 38" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 20L14 24L18 28M30 20L34 24L30 28" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Map concept IDs to icons
export const conceptIconMap: Record<string, React.ComponentType<IconProps>> = {
  'automation': AutomationIcon,
  'rule-based': RuleBasedIcon,
  'ai': AIBrainIcon,
  'input': InputIcon,
  'training-data': TrainingDataIcon,
  'ai-model': AIModelIcon,
  'ai-pipeline': AIPipelineIcon,
  'prediction-models': PredictionIcon,
  'language-models': LanguageModelIcon,
  'computer-vision': ComputerVisionIcon,
  'search-systems': SearchIcon,
  'chatbots': ChatbotsIcon,
  'generative-ai': GenerativeAIIcon,
  'agentic-ai': AgenticAIIcon,
  'ai-engineer': AIEngineerIcon,
};
