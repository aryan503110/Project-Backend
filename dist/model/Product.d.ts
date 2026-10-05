import mongoose from "mongoose";
interface product {
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<product, {}, {}, {}, mongoose.Document<unknown, {}, product, {}, mongoose.DefaultSchemaOptions> & product & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, product>;
export default _default;
//# sourceMappingURL=Product.d.ts.map