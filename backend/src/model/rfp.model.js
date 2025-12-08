import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  specifications: { type: String, default: "" },
});

const rfpSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  budget: {
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
  },
  deadline: { type: String, default: "" },
  items: [itemSchema],
  payment_terms: { type: String, default: "Net 30" },
  warranty_requirement: { type: String, default: "" },
  notes: { type: [String], default: [] },

  user_input: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },

  recommended_proposal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    default: null,
  },
  recommended_vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    default: null,
  },
  award_reason: { type: String, default: "" },
});

export default mongoose.model("RFP", rfpSchema);
