import mongoose from "mongoose";

const rfpDispatchSchema = new mongoose.Schema({
  rfp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RFP",
    required: true,
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  email_status: {
    type: String,
    enum: ["sent", "failed"],
    default: null,
  },
  sent_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("RfpDispatch", rfpDispatchSchema);
