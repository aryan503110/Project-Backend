import mongoose from "mongoose";

interface product {
  name: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
  cocoaPercentage: number;
  weight: number;
  weightType: "g" | "kg";
  flavors: string[];
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    cocoaPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
    weightType: {
      type: String,
      enum: ["g", "kg"],
      required: true,
    },
    flavors: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<product>("Product", ProductSchema);
