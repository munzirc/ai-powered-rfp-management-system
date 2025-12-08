import mongoose from "mongoose";
import Proposal from "../model/proposal.model.js";
import Vendor from "../model/vendor.model.js";
import RFP from "../model/rfp.model.js";
import { parseProposalWithAI } from "./parseProposal.js";
import { extractAttachmentText } from "./emailUtils.js";

import { extractRfpIdFromText } from "../utils/helper.js";

export const saveProposalFromEmail = async (
  parsedEmail,
  emailContent,
  attachments
) => {
  try {
    const vendorEmail = parsedEmail.from.value[0].address;
    const vendor = await Vendor.findOne({ email: vendorEmail });
    if (!vendor) {
      throw new Error("Vendor not found!");
    }

    const subject = parsedEmail.subject;
    const rfpId = extractRfpIdFromText(subject, emailContent);

    if (!rfpId || !mongoose.Types.ObjectId.isValid(rfpId)) {
      throw new Error("Invalid or missing RFP ID");
    }

    const rfp = await RFP.findById(rfpId);
    if (!rfp) {
      throw new Error("No RFP found with this ID!");
    }

    // console.log("Parsed Email: ", parsedEmail);
    // const emailBody = emailContent.split("<!-- AI-RFP-EMAIL-START -->")[0].trim();

    const attachmentText = await extractAttachmentText(attachments);
    const rawProposalText = [emailContent, attachmentText]
      .filter(Boolean)
      .join("\n");

    const proposalRawData = rawProposalText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+/g, " ")
      .trim();

    const extractedData = await parseProposalWithAI(proposalRawData);

    const proposalData = {
      total_price: extractedData.total_price || 0,
      currency: extractedData.currency || "USD",
      delivery_time_days: extractedData.delivery_time_days || "",
      payment_terms: extractedData.payment_terms || "",
      warranty: extractedData.warranty || "",
      notes: extractedData.notes || [],
      items: extractedData.items || [],
    };

    const proposal = new Proposal({
      rfp: rfp._id,
      vendor: vendor._id,
      raw_data: proposalRawData,
      extracted_data: proposalData,
    });

    await proposal.save();

    // console.log("Proposal", proposal);
  } catch (err) {
    console.warn("Error saving proposal:", err.message);
  }
};
