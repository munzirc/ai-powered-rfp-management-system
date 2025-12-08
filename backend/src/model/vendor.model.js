import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  company: { type: String, default: "" },
  phone: { type: String, default: "" },
  contact_name: { type: String, default: "" },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Vendor", vendorSchema);