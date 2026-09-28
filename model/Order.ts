import mongoose from "mongoose";

interface OrderData {
  customer: mongoose.Types.ObjectId;
  salesperson: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
}

const OrderSchema = new mongoose.Schema<OrderData>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["ordered", "dispatched", "delivered"],
      default: "ordered",
    },
  },
  { timestamps: true },
);

export default mongoose.model<OrderData>("Order", OrderSchema);
