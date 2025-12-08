import { Router } from "express";
import rfpController from "../controller/rfp.controller.js";

const router = Router();

router.post("", rfpController.generateRFP);
router.get("",rfpController.getRFPs);

export default router;
