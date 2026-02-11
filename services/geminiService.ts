
import { GoogleGenAI, Type } from "@google/genai";
import { NutritionAnalysis } from "../types";

export const analyzeDiet = async (
  foodItems: string,
  bodyWeight: number = 70
): Promise<NutritionAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this daily diet for a person weighing ${bodyWeight}kg who wants to gain muscle. 
    Food list: ${foodItems}
    
    Calculate estimated Protein (g), Calories (kcal), Carbs (g), and Fats (g).
    Compare protein intake with the muscle gain range (1.6g to 2.2g per kg).
    Provide specific suggestions, timing advice, and hydration advice.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          macros: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER },
              calories: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fats: { type: Type.NUMBER },
            },
            required: ["protein", "calories", "carbs", "fats"]
          },
          summary: { type: Type.STRING },
          proteinAnalysis: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, description: "one of: low, optimal, high, excessive" },
              range: { type: Type.STRING },
              actual: { type: Type.NUMBER },
              difference: { type: Type.NUMBER },
            },
            required: ["status", "range", "actual", "difference"]
          },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          timingAdvice: { type: Type.STRING },
          hydrationAdvice: { type: Type.STRING },
        },
        required: ["macros", "summary", "proteinAnalysis", "suggestions", "timingAdvice", "hydrationAdvice"]
      },
      thinkingConfig: { thinkingBudget: 0 }
    },
  });

  const resultStr = response.text;
  if (!resultStr) throw new Error("No response from AI");
  
  return JSON.parse(resultStr) as NutritionAnalysis;
};
