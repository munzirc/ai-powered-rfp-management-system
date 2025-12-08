import RFP from "../model/rfp.model.js";
import { Ollama } from "ollama";
import { getRFPCreationPrompt } from "../utils/prompts.js";

const generateRFP = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "RFP text is required" });

    const prompt = getRFPCreationPrompt(text);

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
      return res.status(500).json({ error: "AI did not return any content" });
    }

    const rfpData = await JSON.parse(output);

    const title =
      rfpData.title && rfpData.title.trim() !== ""
        ? rfpData.title
        : rfpData.description
        ? rfpData.description.split(".")[0]
        : "Untitled RFP";

    const newRFP = await RFP.create({
      title: title,
      description: rfpData.description || "",
      items: rfpData.items || [],
      budget: rfpData.budget || { amount: 0, currency: "USD" },
      deadline: rfpData.deadline || "",
      payment_terms: rfpData.payment_terms || "",
      warranty_requirement: rfpData.warranty_requirement || "",
      notes: rfpData.notes || {},
      created_at: new Date(),
      user_input: text || "",
    });

    const { user_input, __v, ...cleanRFP } = newRFP._doc;

    res.status(200).json({ success: true, rfp: cleanRFP });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRFPs = async (req, res) => {
  try {
    const rfps = await RFP.find()
      .select(
        "_id title description budget deadline items payment_terms warranty_requirement notes recommended_proposal_id recommended_vendor_id award_reason created_at"
      )
      .sort({ created_at: -1 });
    res.status(200).json({ success: true, rfps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RFPs" });
  }
};

export default {
  generateRFP,
  getRFPs,
};
