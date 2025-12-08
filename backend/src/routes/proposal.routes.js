import express from "express";
import proposalController from "../controller/proposal.controller.js";

const router = express.Router();

router.get("/:rfpId", proposalController.getProposalsForRFP);
router.get("/compare/:rfpId", proposalController.compareProposals);

export default router;
