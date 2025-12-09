import mongoose from "mongoose";
import RFP from "../model/rfp.model.js";
import rfpDispatch from "../model/rfpdispatch.model.js";
import Vendor from "../model/vendor.model.js";
import { generateRfpEmail } from "../utils/rfpEmailTemplate.js";
import { transporter } from "../config/mailer.js";

const sendRfpToVendors = async (req, res) => {
  try {
    const { rfpId, vendorIds } = req.body;

    if (!rfpId || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      throw new Error("RFP Id and vendorIds array are required");
    }

    if (!mongoose.Types.ObjectId.isValid(rfpId)) {
      throw new Error("Invalid RFP ID");
    }

    const rfp = await RFP.findById(rfpId);

    if (!rfp) {
      throw new Error("RFP not found");
    }

    for (const vendorId of vendorIds) {
      if (!mongoose.Types.ObjectId.isValid(vendorId)) continue;

      const vendor = await Vendor.findById(vendorId);
      if (!vendor) continue;

      const email = generateRfpEmail(rfp, vendor);

      const mailOptions = {
        from: `"AI-RFP" ${process.env.EMAIL_USER}`,
        to: vendor.email,
        subject: `${rfp.title} - RFP: ${rfp._id}`,
        html: email,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          await rfpDispatch.create({
            rfp_id: rfp._id,
            vendor_id: vendor._id,
            email_status: "failed",
          });
        } else {
          await rfpDispatch.create({
            rfp_id: rfp._id,
            vendor_id: vendor._id,
            email_status: "sent",
          });
        }
      });
    }


    return res.status(200).json({
      message: "RFP emails processed",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  sendRfpToVendors,
};
