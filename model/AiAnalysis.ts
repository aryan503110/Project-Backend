import mongoose from "mongoose";

interface AiAnalysisData {
  analysis: string;
}

const AiAnalysisSchema = new mongoose.Schema<AiAnalysisData>(
  {
    analysis: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<AiAnalysisData>("AiAnalysis", AiAnalysisSchema);
