import mongoose from "mongoose";
interface SalespersonStockRequestData {
    salesperson: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    requestedStock: number;
    status: string;
}
declare const _default: mongoose.Model<SalespersonStockRequestData, {}, {}, {}, mongoose.Document<unknown, {}, SalespersonStockRequestData, {}, mongoose.DefaultSchemaOptions> & SalespersonStockRequestData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, SalespersonStockRequestData>;
export default _default;
//# sourceMappingURL=SalespersonStockRequest.d.ts.map