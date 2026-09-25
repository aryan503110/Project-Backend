import mongoose from "mongoose";

interface SalespersonStockData {
  salesperson: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  stock: number;
  normalSellingPrice?: number;
  subscriptionSellingPrice?: number;
}

const salespersonStockSchema =
  new mongoose.Schema<SalespersonStockData>({
    salesperson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    normalSellingPrice: {
      type: Number,
      min: 0,
    },

    subscriptionSellingPrice: {
      type: Number,
      min: 0,
    },
  });

export default mongoose.model<SalespersonStockData>(
  "SalespersonStock",
  salespersonStockSchema,
);