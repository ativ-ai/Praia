
export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export type PromptCategory = "Marketing" | "Code Generation" | "Copywriting" | "Ideation" | "Image Generation" | "Productivity" | "Data Analysis" | "Personal Development" | "Sales" | "Business" | "Role-Playing" | "Advertising" | "Content Creation" | "Creative Writing" | "E-Commerce" | "Editing & Proofreading" | "Goal Setting" | "Graphic Design" | "Personal Finance" | "Persuasion & Influence" | "Social Media" | "Frameworks" | "Learning" | "Career" | "Self Help" | "Education" | "Research" | "Fundamentals" | "Advanced Techniques";

export interface Prompt {
  id: string; // Unique ID for this specific version
  historyId: string; // Common ID for all versions of a prompt
  version: number;
  isLatest: boolean;
  uid?: string;
  title: string;
  promptText: string;
  description: string;
  category: PromptCategory;
  isFavorited?: boolean;
  originalPublicId?: string;
  folderId?: string | null;
  createdAt: number; // Timestamp of when this version was created
  framework?: PromptFramework | null;
  frameworkData?: Record<string, string>;
}

export interface GroupedPrompt {
  type: 'grouped-prompt';
  id: string; // Composite ID from title
  title: string;
  description: string;
  category: PromptCategory;
  prompts: Prompt[]; // The actual prompts
  frameworks: PromptFramework[];
  createdAt: number;
}


export interface PromptFolder {
  id: string;
  name: string;
  uid?: string;
}

export enum PromptFramework {
  RTF = "R-T-F",
  TAG = "T-A-G",
  BAB = "B-A-B",
  CARE = "C-A-R-E",
  RISE = "R-I-S-E",
  SCOPE = "S.C.O.P.E.",
  PACEF = "P.A.C.E.F.",
  CURATE = "C.U.R.A.T.E.",
  PARLA = "P.A.R.L.A.",
  FACTS = "F.A.C.T.S.",
  BRIDGE = "B.R.I.D.G.E.",
  CREATE = "C.R.E.A.T.E.",
  CRAFT = "C.R.A.F.T.",
}

export interface FrameworkField {
  key: string;
  label: string;
  placeholder: string;
}

export interface PromptFrameworkDefinition {
  name:string;
  fields: FrameworkField[];
  description: string;
}

export type TrainingCategory = "Fundamentals" | "Advanced Techniques" | "Business & Marketing" | "Frameworks & Patterns" | "Education" | "Creative & Media" | "Career";

export interface TrainingModule {
    id: string;
    uid?: string;
    title: string;
    description: string;
    category: TrainingCategory;
    content: TrainingContent[];
    isFavorited?: boolean;
    originalPublicId?: string;
    createdAt?: number;
}

export interface TrainingContent {
    id: string;
    title: string;
    details: string;
    example?: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
}

export type AIToolCategory = "Image Generation" | "Video Generation" | "Writing" | "Code Assistant" | "Productivity" | "Audio & Music" | "Chatbot" | "Marketing" | "Design" | "Social Media" | "Research" | "Presentations" | "Data Analysis" | "3D & VR" | "Sales" | "Website" | "Meeting" | "SEO" | "Automation" | "Prompts" | "UI/UX" | "Logo Generator";

export interface AITool {
  id: string;
  uid?: string;
  name: string;
  description: string;
  link: string;
  category: AIToolCategory;
  iconUrl: string;
  isFavorited?: boolean;
  originalPublicId?: string;
  createdAt?: number;
}