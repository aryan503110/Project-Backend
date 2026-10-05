import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    premiumStartDate: {
        type: Date,
    },
    premiumExpiryDate: {
        type: Date,
    },
}, { timestamps: true });
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map