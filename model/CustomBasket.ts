import mongoose from "mongoose";

interface CustomBasketData {
  customer: mongoose.Schema.Types.ObjectId;
  items: {
    salespersonStock: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  isGift: boolean;
  giftMessage?: string;
  status: "draft" | "pending" | "confirmed";
}

const customBasketSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        salespersonStock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SalespersonStock",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    isGift: {
      type: Boolean,
      default: false,
    },

    giftMessage: {
      type: String,
      default: "",
      maxlength: 300,
    },

    status: {
      type: String,
      enum: ["draft", "pending", "confirmed"],
      default: "draft",
    },
  },
  { timestamps: true },
);

export default mongoose.model("CustomBasket", customBasketSchema);
