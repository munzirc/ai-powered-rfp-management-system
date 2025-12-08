import { Ollama } from "ollama";
import { getProposalCreationPrompt } from "../utils/prompts.js";

export const parseProposalWithAI = async (text) => {
  try {
    const prompt = getProposalCreationPrompt(text);

    const ollama = new Ollama({
      host: "https://ollama.com",
      headers: {
        Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
      },
    });

    const response = await ollama.chat({
      model: "gpt-oss:120b",
      messages: [{ role: "user", content: prompt }],
    });

    const output = response?.message?.content;
    if (!output) {
      throw new Error("AI did not return any content");
    }

    const proposalData = await JSON.parse(output);

    return proposalData;
  } catch (error) {
    console.log("Error generating proposal :", error?.message)
  }
};
