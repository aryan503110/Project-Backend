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

const userSchema = new mongoose.Schema<User>(
  {
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
  },
  { timestamps: true },
);

export default mongoose.model<User>("User", userSchema);
