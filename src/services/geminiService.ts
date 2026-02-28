import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

export const predictMOA = async (sampleId: string, modelId: string, geneData: number[]) => {
  const ai = getAI();
  
  const prompt = `You are a bioinformatics expert. Analyze this gene expression profile (subset provided) and predict the Mechanism of Action (MOA).
  Sample ID: ${sampleId}
  Model: ${modelId}
  Data: ${JSON.stringify(geneData).slice(0, 2000)}...
  
  Return a JSON object with:
  1. top_predictions: array of { moa: string, confidence: number, description: string }
  2. xai_narrative: 3-5 sentence explanation of the biological rationale.
  3. important_genes: array of { symbol: string, weight: number, direction: "up" | "down" }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          top_predictions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                moa: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                description: { type: Type.STRING }
              },
              required: ["moa", "confidence", "description"]
            }
          },
          xai_narrative: { type: Type.STRING },
          important_genes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                symbol: { type: Type.STRING },
                weight: { type: Type.NUMBER },
                direction: { type: Type.STRING }
              },
              required: ["symbol", "weight", "direction"]
            }
          }
        },
        required: ["top_predictions", "xai_narrative", "important_genes"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const getAssistantResponse = async (message: string, history: any[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are the GeneMOA Intelligence Assistant. You are a world-class expert in bioinformatics, drug discovery, and mechanism of action prediction. Help users interpret their results and understand the biology behind gene expression changes."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
