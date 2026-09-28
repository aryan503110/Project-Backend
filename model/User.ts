import mongoose from "mongoose";

type Role = "" | "admin" | "salesperson" | "customer";

interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
<<<<<<< HEAD
  image:string
=======
  image: string;
  isPremium: boolean;
  premiumStartDate?: Date;
  premiumExpiryDate?: Date;
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
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
<<<<<<< HEAD
=======
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
>>>>>>> 4c8e1d750196090a02dbb7b91ce5d12cc0a527e7
  },
  { timestamps: true },
);

export default mongoose.model<User>("User", userSchema);
