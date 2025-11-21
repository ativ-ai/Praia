
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { lyraPromptText } from '../data/lyraPromptText';
import { PROMPT_FRAMEWORKS } from "../constants";
import { PromptFramework } from "../types";

// Ensure API key is handled by environment variables.
// Do not add any UI or logic to ask the user for this key.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const enhancePrompt = async (
  userPrompt: string,
  targetAI: string,
  style: string
): Promise<string> => {
  
  const metaPrompt = `${lyraPromptText}

---

A user wants to optimize the following prompt. Use your full 4-D methodology to perform a '${style}' optimization.

USER'S PROMPT TO OPTIMIZE:
"""
${userPrompt}
"""

OPTIMIZATION PARAMETERS:
- Target AI: ${targetAI}
- Prompt Style: ${style}

Your final output MUST be ONLY the optimized prompt text itself, without any of your usual formatting (like "**Your Optimized Prompt:**" or "**What Changed:**") or markdown. Just the raw, ready-to-use prompt text.`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error enhancing prompt with Lyra:", error);
    throw new Error("Failed to get enhancement from Lyra. Please check your API key and network connection.");
  }
};

export const applyFrameworkToPrompt = async (
  userPrompt: string,
  frameworkKey: PromptFramework
): Promise<string> => {
  const framework = PROMPT_FRAMEWORKS[frameworkKey];
  if (!framework) {
    throw new Error("Invalid framework selected.");
  }

  const structureDetails = framework.fields.map(f => `- **${f.label}:** [Description of what to put here]`).join('\n');

  const metaPrompt = `You are an expert prompt engineer. Your task is to rewrite a user's prompt to fit a specific framework.

FRAMEWORK: ${framework.name} (${frameworkKey})
DESCRIPTION: ${framework.description}
STRUCTURE:
${structureDetails}

Take the user's original prompt below and rewrite it to adhere strictly to this structure. The output should be ONLY the rewritten prompt text. Do not add any explanations or markdown formatting. For example, if the framework is R-T-F, the output should start directly with "Act as a...".

ORIGINAL PROMPT:
"""
${userPrompt}
"""
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error applying framework to prompt:", error);
    throw new Error("Failed to apply framework. Please check your API key and network connection.");
  }
};

export const generateProSpec = async (userIntent: string): Promise<string> => {
  const metaPrompt = `Role: Senior System Architect & PRO-SPEC Framework Expert.
Task: Transform the user's raw idea (The Vibe) into a standardized, rigorous PRO-SPEC Markdown artifact.

The PRO-SPEC is the "Source of Truth" that prevents context drift in AI coding sessions.

# PRO-SPEC 5-LAYER ARCHITECTURE (Strictly follow this format):

## [L1] PRODUCT INTENT (The Soul)
- **User Story:** Who is this for and what do they achieve?
- **The Vibe:** Describe the look, feel, and emotional response of the product.
- **Core Value:** What is the single most important metric of success?

## [L2] TECHNICAL CONTRACTS (The Skeleton)
- **Tech Stack:** Recommend the best modern stack (e.g., React/Vite, Tailwind, Supabase/Firebase/Node).
- **Database Schema:** Define models using succinct pseudo-code or Prisma syntax.
- **API Interface:** Define key endpoints or server actions with inputs/outputs.
- **UI Components:** List key React components and their hierarchy.

## [L3] THE SHIELD (Security & Rules)
*Instructions for the AI Builder to reject code that violates these:*
- **Auth:** How is user identity verified?
- **Validation:** Rules for input sanitization (Zod schemas, etc.).
- **RBAC:** Who can do what?

## [L4] THE ENGINE (Performance & UX)
- **State Management:** How is data handled on the client?
- **Optimistic UI:** Where should the app feel "instant"?
- **Error Handling:** How does it fail gracefully?

## [L5] ORCHESTRATION (The Command)
- **Role:** Define the persona the AI coder should adopt (e.g., "Senior Frontend Engineer").
- **Task:** A clear, step-by-step instruction to generate the code based on L1-L4.
- **Constraint:** "Do not hallucinate features not in L1. Follow L3 security rules strictly."

# USER INPUT (THE VIBE):
"""
${userIntent}
"""

# OUTPUT INSTRUCTION:
Return ONLY the PRO-SPEC markdown content. Start immediately with "# PRO-SPEC: [Title]".
Use clear Markdown formatting. Be professional, precise, and technically robust.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating PRO-SPEC:", error);
    throw new Error("Failed to generate PRO-SPEC. Please check your API key.");
  }
};

export const generateComponent = async (userIntent: string): Promise<string> => {
  const metaPrompt = `Role: Expert Senior Frontend Engineer (React + Tailwind CSS).
Task: Create a production-ready React component based on the user's description ("The Vibe").

Requirements:
- Use React (Functional Components with Hooks).
- Use Tailwind CSS for styling.
- Ensure the component is responsive and accessible (ARIA).
- Use standard imports (e.g., 'react').
- Assume 'lucide-react' or 'react-icons' are available if icons are needed.
- Return ONLY the code. The code should be ready to save as a .tsx file.

USER INPUT (THE VIBE):
"""
${userIntent}
"""

OUTPUT:
The complete component code.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
    });
    // Remove potential markdown code blocks if Gemini adds them
    const text = response.text.trim();
    const cleanText = text.replace(/^```(tsx|jsx|javascript|typescript)?\n/, '').replace(/```$/, '');
    return cleanText;
  } catch (error) {
    console.error("Error generating component:", error);
    throw new Error("Failed to generate component. Please check your API key.");
  }
};
