import Vendor from "../model/vendor.model.js";
import mongoose from "mongoose";

const createVendor = async (req, res) => {
  try {
    const { name, email, company, phone, contact_name } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(409).json({
        error: "Vendor with this email already exists",
      });
    }

    const vendor = await Vendor.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company,
      phone,
      contact_name,
    });

    return res.status(201).json({
      message: "Vendor created successfully",
      vendor
    });
  } catch (error) {
    console.error("Create vendor error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({});
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors");
    res.status(500).json({ error: "Could not fetch vendors" });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid vendor ID" });
    }

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    return res.status(200).json(vendor);
  } catch (error) {
    console.error("Get vendor by ID error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default {
  createVendor,
  getVendors,
  getVendorById,
};
