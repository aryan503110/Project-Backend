import mongoose from "mongoose";
const AdminStockSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
export default mongoose.model("AdminStock", AdminStockSchema);
//# sourceMappingURL=AdminStock.js.map