import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  unit_price: {
    type: Number,
    required: true,
  },

  specifications: {
    type: String,
    default: "",
  },
});

const proposalSchema = new mongoose.Schema({
  rfp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RFP",
    required: true,
  },

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },

  raw_data: {
    type: String,
    required: true,
  },

  extracted_data: {
    total_price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    delivery_time_days: {
      type: String,
      required: true,
    },

    payment_terms: {
      type: String,
      required: true,
    },

    warranty: {
      type: String,
      default: "",
    },

    notes: {
      type: [String],
      default: [],
    },

    items: {
      type: [itemSchema],
      default: [],
    },
  },

  ai_score: {
    type: Number,
    default: 0,
  },

  ai_summary: {
    type: String,
    default: "",
  },

  ai_verdict: {
    type: String,
    default: "",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Proposal", proposalSchema);
