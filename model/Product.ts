import mongoose from "mongoose";

interface product {
  name: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
}
const ProductSchema = new mongoose.Schema<product>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<product>("Product", ProductSchema);
