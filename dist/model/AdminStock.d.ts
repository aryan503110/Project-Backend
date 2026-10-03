import mongoose from "mongoose";
interface AdminStockData {
    product: mongoose.Types.ObjectId;
    stock: number;
    purchasePrice: number;
}
declare const _default: mongoose.Model<AdminStockData, {}, {}, {}, mongoose.Document<unknown, {}, AdminStockData, {}, mongoose.DefaultSchemaOptions> & AdminStockData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, AdminStockData>;
export default _default;
//# sourceMappingURL=AdminStock.d.ts.map