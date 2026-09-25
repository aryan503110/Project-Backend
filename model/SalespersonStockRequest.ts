import mongoose from "mongoose";

interface SalespersonStockRequestData {
  salesperson: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  requestedStock: number;
  status: string;
}

const salespersonStockRequestSchema =
  new mongoose.Schema<SalespersonStockRequestData>({
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

    requestedStock: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  });

export default mongoose.model<SalespersonStockRequestData>(
  "SalespersonStockRequest",
  salespersonStockRequestSchema,
);
