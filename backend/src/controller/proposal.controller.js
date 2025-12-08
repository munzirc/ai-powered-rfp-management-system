import mongoose from "mongoose";
import Proposal from "../model/proposal.model.js";
import RFP from "../model/rfp.model.js";
import { getProposalComparsionPrompt } from "../utils/prompts.js";
import { Ollama } from "ollama";

const getProposalsForRFP = async (req, res) => {
  try {
    const { rfpId } = req.params;

    if (!rfpId || !mongoose.Types.ObjectId.isValid(rfpId)) {
      throw new Error("Invalid or missing RFP ID");
    }

    const rfp = await RFP.findById(rfpId);
    if (!rfp) {
      throw new Error("RFP not found");
    }

    const proposals = await Proposal.find({ rfp: rfpId })
      .select("vendor extracted_data ai_score ai_summary ai_verdict created_at")
      .populate("vendor", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching proposals for RFP:", error.message);
    return res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const compareProposals = async (req, res) => {
  try {
    const { rfpId } = req.params;

    if (!rfpId || !mongoose.Types.ObjectId.isValid(rfpId)) {
      throw new Error("Invalid or missing RFP ID");
    }

    const rfp = await RFP.findById(rfpId);
    if (!rfp) {
      throw new Error("RFP not found");
    }

    const proposals = await Proposal.find({ rfp: rfpId });

    if (proposals.length == 0) {
      return res
        .status(400)
        .json({ message: "No proposals found for comparision" });
    }

    const prompt = getProposalComparsionPrompt(rfp, proposals);

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

    const result = await JSON.parse(output);

    if (!Array.isArray(result)) {
      throw new Error("Invalid AI response format");
    }

    let bestScore = -1;
    let recommendedProposal = null;

    for (const item of result) {
      const updated = await Proposal.findByIdAndUpdate(
        item.proposal_id,
        {
          ai_score: item.ai_score,
          ai_summary: item.ai_summary,
          ai_verdict: item.ai_verdict,
        },
        { new: true }
      );

      if (item.ai_score > bestScore) {
        bestScore = item.ai_score;
        recommendedProposal = updated;
      }
    }

    rfp.recommended_proposal_id = recommendedProposal._id;
    rfp.recommended_vendor_id = recommendedProposal.vendor;
    rfp.award_reason = recommendedProposal.ai_summary;

    await rfp.save();

    const evaluatedProposals = await Proposal.find({ rfp: rfpId })
      .select("vendor extracted_data ai_score ai_summary ai_verdict created_at")
      .populate("vendor", "name email")
      .sort({ createdAt: -1 });
    
    const { user_input, __v, ...cleanRFP } = rfp._doc;
    
    res.status(200).json({
      rfp: cleanRFP,
      proposals: evaluatedProposals
    })
    


  } catch (error) {
    console.error("Error in Proposal comparsion api:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getProposalsForRFP,
  compareProposals,
};
