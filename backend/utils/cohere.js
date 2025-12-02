import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

export async function generateStoryFromCohere(prompt) {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-a-03-2025",
        message: prompt,
        temperature: 0.8,
      },
      {
        headers: {
          "Authorization": `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data?.text || response.data?.message?.content;
    if (!generatedText) {
      console.error("❌ Cohere returned no text:", response.data);
      throw new Error("No text returned from Cohere.");
    }

    return generatedText;
  } catch (error) {
    console.error("❌ Error from Cohere:", error.message);
    if (error.response) console.error(error.response.data);
    throw new Error("Cohere API failed");
  }
}
