import mongoose from "mongoose";
interface forgotpasswordschema {
    userId: string;
    email: string;
    otp: number;
    expiresAt: Date;
}
declare const _default: mongoose.Model<forgotpasswordschema, {}, {}, {}, mongoose.Document<unknown, {}, forgotpasswordschema, {}, mongoose.DefaultSchemaOptions> & forgotpasswordschema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, forgotpasswordschema>;
export default _default;
//# sourceMappingURL=PasswordReset.d.ts.map