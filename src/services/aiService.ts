
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

// Initialize clients only if keys exist
export const geminiClient = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

// Note: Using Claude on client side requires 'dangerouslyAllowBrowser: true' 
// if it's a pure client app. In production, proxy this through an Edge Function.
export const anthropicClient = anthropicKey ? new Anthropic({
  apiKey: anthropicKey,
  dangerouslyAllowBrowser: true,
}) : null;

export interface AiMessage {
  role: 'user' | 'ai';
  content: string;
}

export const generateResponse = async (
  prompt: string, 
  engine: 'gemini' | 'claude' = 'gemini',
  systemPrompt: string = "Você é um especialista em películas de alta performance WINF™."
) => {
  if (engine === 'claude') {
    if (!anthropicClient) throw new Error("Anthropic API key not configured");
    
    const response = await anthropicClient.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    });
    
    // Check if content is text
    const textContent = response.content.find(c => c.type === 'text');
    return textContent ? textContent.text : 'Sem resposta';
  } else {
    if (!geminiClient) throw new Error("Gemini API key not configured");
    
    const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUsuário: ${prompt}` }] }]
    });
    return result.response.text();
  }
};
