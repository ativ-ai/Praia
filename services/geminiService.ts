
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
  if (!style.startsWith('BASIC')) {
      throw new Error('DETAIL style enhancement is not yet supported.');
  }

  const metaPrompt = `${lyraPromptText}

---

A user wants to optimize the following prompt. Use your full 4-D methodology to perform a BASIC optimization.

USER'S PROMPT TO OPTIMIZE:
"""
${userPrompt}
"""

OPTIMIZATION PARAMETERS:
- Target AI: ${targetAI}
- Prompt Style: BASIC

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
  const metaPrompt = `Role: Senior System Architect & PRO-SPEC Expert.
Task: Transform the user's rough idea (The Vibe) into a standardized, rigorous PRO-SPEC Markdown artifact.

# PRO-SPEC STRUCTURE RULES (Strictly follow this 5-layer format):
1. [L1] PRODUCT INTENT: Define User Story, Business Logic, & Core Value.
2. [L2] TECHNICAL CONTRACTS: Define DB Schema (Prisma/SQL style) & API Interfaces (TS/JSON).
3. [L3] THE SHIELD: Define Security Constraints (Auth, Sanitization, RBAC).
4. [L4] THE ENGINE: Define Performance & UX Constraints (Caching, Optimistic UI, Loading States).
5. [L5] ORCHESTRATION: Define the Role & specific Task for the AI developer who will consume this spec.

# USER INPUT (THE VIBE):
"""
${userIntent}
"""

# OUTPUT INSTRUCTION:
Return ONLY the PRO-SPEC markdown content. Do not include any conversational filler text. Start the output immediately with the title header "# PRO-SPEC: [Title]".
Ensure the content is technical, precise, and ready for a developer or AI coder to implement directly.
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
