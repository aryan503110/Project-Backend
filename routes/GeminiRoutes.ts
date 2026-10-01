import express from "express";
import { GenerateAIAnalysis ,GetLatestAIAnalysis} from "../controller/GeminiController.js";

const router = express.Router();

router.get("/generate-analysis", GenerateAIAnalysis);
router.get("/latest-analysis", GetLatestAIAnalysis);

export default router;
