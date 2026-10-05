import mongoose from "mongoose";
interface OrderData {
    customer: mongoose.Types.ObjectId;
    salesperson: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    totalAmount: number;
    paymentStatus: string;
    orderStatus: string;
}
declare const _default: mongoose.Model<OrderData, {}, {}, {}, mongoose.Document<unknown, {}, OrderData, {}, mongoose.DefaultSchemaOptions> & OrderData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, OrderData>;
export default _default;
//# sourceMappingURL=Order.d.ts.map