import express from "express";
import { GetLatestAIAnalysis } from "../controller/GeminiController.js";

const router = express.Router();

router.get("/latest-analysis", GetLatestAIAnalysis);

export default router;
