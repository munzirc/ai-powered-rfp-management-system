import express from 'express'
import rfpdispatchController from '../controller/rfpdispatch.controller.js';

const router = express.Router();

router.post("", rfpdispatchController.sendRfpToVendors);

export default router;