import mongoose, {
  type StringExpressionOperatorReturningObject,
} from "mongoose";

interface salespersonstock {
  salesperson: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  stock: number;
  status: string;
}

const salespersonStockSchema = new mongoose.Schema<salespersonstock>({
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

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export default mongoose.model<salespersonstock>(
  "SalerpersonStock",
  salespersonStockSchema,
);
