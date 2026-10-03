import mongoose from "mongoose";
interface AiAnalysisData {
    analysis: string;
}
declare const _default: mongoose.Model<AiAnalysisData, {}, {}, {}, mongoose.Document<unknown, {}, AiAnalysisData, {}, mongoose.DefaultSchemaOptions> & AiAnalysisData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, AiAnalysisData>;
export default _default;
//# sourceMappingURL=AiAnalysis.d.ts.map