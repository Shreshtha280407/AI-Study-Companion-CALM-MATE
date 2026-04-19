import Groq from "groq-sdk";

/**
 * Generate 10 random assignments for a specific subject using Groq (Llama 3)
 */
export const generateAIQuestions = async (subject) => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!API_KEY) {
    throw new Error("Groq API Key is missing! Please add VITE_GROQ_API_KEY to your .env file.");
  }

  try {
    const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert tutor for ${subject}. Return only a valid JSON array of 10 objects. Each object must have: "title", "description", and "difficulty" (Beginner, Intermediate, or Hard). No markdown, no extra text.`
        },
        {
          role: "user",
          content: `Generate 10 practice assignments for ${subject}.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const parsed = JSON.parse(content);

    // Normalize response (ensure it's an array)
    if (Array.isArray(parsed)) return parsed;
    if (parsed.assignments && Array.isArray(parsed.assignments)) return parsed.assignments;
    if (typeof parsed === 'object') return Object.values(parsed).find(val => Array.isArray(val)) || [];

    return [];
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate questions via Groq. " + error.message);
  }
};
