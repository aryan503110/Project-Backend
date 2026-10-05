import mongoose from "mongoose";
interface category {
    categoryName: string;
}
declare const _default: mongoose.Model<category, {}, {}, {}, mongoose.Document<unknown, {}, category, {}, mongoose.DefaultSchemaOptions> & category & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, category>;
export default _default;
//# sourceMappingURL=Category.d.ts.map