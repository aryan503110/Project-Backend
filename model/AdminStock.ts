import mongoose from "mongoose";

interface AdminStockData {
  product: mongoose.Types.ObjectId;
  stock: number;
  purchasePrice: number;
}

const AdminStockSchema = new mongoose.Schema<AdminStockData>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    purchasePrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<AdminStockData>("AdminStock", AdminStockSchema);
