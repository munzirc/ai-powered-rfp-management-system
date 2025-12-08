import express from 'express';
import vendorController from '../controller/vendor.controller.js';
import { createVendorValidator } from '../validator/vendor.validator.js';
import { validateRequest } from '../middleware/validateRequest.js';


const router = express.Router();

router.post("", createVendorValidator, validateRequest, vendorController.createVendor);
router.get("", vendorController.getVendors);
router.get("/:id", vendorController.getVendorById);

export default router;