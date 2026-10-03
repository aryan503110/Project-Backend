import mongoose from "mongoose";
type Role = "" | "admin" | "salesperson" | "customer";
interface User {
    name: string;
    email: string;
    password: string;
    role: Role;
    image: string;
    isPremium: boolean;
    premiumStartDate?: Date;
    premiumExpiryDate?: Date;
}
declare const _default: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, User>;
export default _default;
//# sourceMappingURL=User.d.ts.map