import mongoose from "mongoose";
const passwordResetModal = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 },
    },
});
export default mongoose.model("PasswordReset", passwordResetModal);
//# sourceMappingURL=PasswordReset.js.map