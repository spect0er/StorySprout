import { CohereClient } from "cohere-ai";

// ✅ Check if the API key is loaded
console.log("Cohere key loaded?", process.env.COHERE_API_KEY ? "✅ YES" : "❌ NO");

// ✅ Instantiate Cohere client — use `token` not `apiKey`
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export const createExcuse = async (req, res) => {
  try {
    const { who, urgency, whatHappened } = req.body;

    // Validate request body
    if (!who || !urgency || !whatHappened) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Prompt as provided
    const prompt = `You are an expert in crafting realistic, thoughtful, and respectful excuses for various real-life situations, especially in academic and social contexts. 

Your goal is to generate a **single excuse** that:
- Feels genuine and responsible, avoiding overused clichés like “I was sick” or “there was traffic”
- Sounds believable, as if the person actually experienced it
- Matches the **urgency** of the situation (low, medium, high)
- Is tailored to **who the excuse is meant for** (e.g., friends, teachers, club seniors)
- Makes the person seem accountable and mature, even when explaining a mistake
- Is natural and easy to use in a real conversation or message

Format:
Who it's for: ${who}
Urgency: ${urgency}
What happened: ${whatHappened}

Write the excuse below:
`;


    // Generate from Cohere
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt,
      max_tokens: 300,
      temperature: 1.2,
    });

    // Extract excuse
    const excuse = response.generations[0]?.text?.trim();

    if (!excuse) {
      return res.status(500).json({ error: "No excuse was generated" });
    }

    res.status(200).json({ excuse });
  } catch (err) {
    console.error("Excuse generation error:", err.message);
    res.status(500).json({ error: "Failed to generate excuse" });
  }
};
