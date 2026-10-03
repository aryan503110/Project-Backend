import mongoose from "mongoose";
const AiAnalysisSchema = new mongoose.Schema({
    analysis: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("AiAnalysis", AiAnalysisSchema);
//# sourceMappingURL=AiAnalysis.js.map