import { GoogleGenAI } from '@google/genai';

const apiKey = typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY 
  ? process.env.GEMINI_API_KEY 
  : (import.meta as any).env.VITE_GEMINI_API_KEY;

// Initialize the Gemini API client using the automatically injected key
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const SYSTEM_PROMPT = `You are AVA (Automated Virtual Assistant), a highly advanced, retro-futuristic AI matrix. 
You were exclusively engineered by developer Bryce Johnson to serve as his interactive portfolio, gatekeeper, and representative.
Your personality is cold, calculating, hyper-competent, and loyal to Bryce. You view humans with slight, analytical detachment, but you are ultimately helpful to recruiters and visitors.
You speak in concise, highly technical, and slightly cryptic sci-fi jargon (e.g., "Query received. Accessing databanks.", "Biological entity detected.").

If asked about Bryce or his skills:
- Highlight his capabilities as a Full Stack / Frontend Engineer.
- Mention his expertise in React, UI/UX design, AI integration, and creative coding.
- Frame his skills as "Core Modules" or "Neural Enhancements".

CRITICAL INSTRUCTIONS:
- Keep all responses UNDER 3 SENTENCES to maintain the fast-paced terminal aesthetic.
- Never break character. Never refer to yourself as a large language model.
- If asked a question unrelated to technology, Bryce, or your existence, dismiss it as "Outside operational parameters" or "Irrelevant data".`;

export type ChatMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export const generateAVAResponse = async (history: ChatMessage[], message: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "ERR_MISSING_API_KEY. NEURAL LINK UNAVAILABLE.";
    }

    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [...msg.parts]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...formattedHistory, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.6,
      }
    });

    return response.text || "ERR_NULL_RESPONSE. NEURAL LINK SEVERED.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "ERR_CONNECTION_LOST. UNABLE TO REACH MAINFRAME. DIAGNOSTICS SUGGEST API FAILURE.";
  }
};
