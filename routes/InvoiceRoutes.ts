import express from "express";
import { DownloadInvoice } from "../controller/InvoiceController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/:orderId",
  authMiddleware,
  roleMiddleware("customer"),
  DownloadInvoice,
);

export default router;
