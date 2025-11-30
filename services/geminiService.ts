import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMedicalInsight = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: "You are 'Horseed AI', a helpful medical administrative assistant for Horseed Hospital. Your goal is to help hospital staff understand medical terms, draft professional summaries, or answer general operational questions. You are NOT a doctor and should always advise consulting a real physician for clinical decisions. Keep answers concise, professional, and formatted for quick reading.",
        temperature: 0.7,
      },
    });

    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the Horseed Intelligence Network. Please try again later.";
  }
};