
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { lyraPromptText } from '../data/lyraPromptText';

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