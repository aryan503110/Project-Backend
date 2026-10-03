import mongoose from "mongoose";
interface SalespersonStockData {
    salesperson: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    stock: number;
    normalSellingPrice?: number;
    subscriptionSellingPrice?: number;
}
declare const _default: mongoose.Model<SalespersonStockData, {}, {}, {}, mongoose.Document<unknown, {}, SalespersonStockData, {}, mongoose.DefaultSchemaOptions> & SalespersonStockData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, SalespersonStockData>;
export default _default;
//# sourceMappingURL=SalespersonStock.d.ts.map