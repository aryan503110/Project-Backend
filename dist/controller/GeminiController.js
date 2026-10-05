import { generateAIAnalysis } from "../utils/generateAIAnalysis.js";
import connectToDB from "../db/db.js";
import AiAnalysis from "../model/AiAnalysis.js";
export const GetLatestAIAnalysis = async (req, res) => {
    try {
        await connectToDB();
        const analysis = await AiAnalysis.findOne().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: "Latest AI analysis fetched successfully",
            success: true,
            analysis,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error fetching AI analysis",
            success: false,
        });
    }
};
//# sourceMappingURL=GeminiController.js.map