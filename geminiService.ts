
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedCode } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    html: {
      type: Type.STRING,
      description: "The complete HTML code snippet using Tailwind CSS classes.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief explanation of how the component works or any special features added.",
    },
  },
  required: ["html", "explanation"],
};

export const generateHTML = async (prompt: string): Promise<GeneratedCode> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a modern, responsive HTML component using Tailwind CSS based on the following request: "${prompt}". 
      Requirements:
      1. Use semantic HTML5.
      2. Use only Tailwind CSS for styling (no custom CSS blocks).
      3. Use placeholder images from https://picsum.photos where appropriate.
      4. Ensure it is accessible.
      5. The output must be valid HTML that can run in a standalone browser environment.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const result = JSON.parse(response.text || '{}');
    return {
      html: result.html || "<!-- Failed to generate -->",
      explanation: result.explanation || "No explanation provided.",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error generating HTML:", error);
    throw error;
  }
};
