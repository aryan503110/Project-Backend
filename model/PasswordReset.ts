import mongoose from "mongoose";

interface forgotpasswordschema {
  userId: string;
  email: string;
  otp: number;
  expiresAt: Date;
}

const passwordResetModal = new mongoose.Schema<forgotpasswordschema>({
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

export default mongoose.model<forgotpasswordschema>(
  "PasswordReset",
  passwordResetModal,
);
