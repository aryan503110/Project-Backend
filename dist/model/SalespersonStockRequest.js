import mongoose from "mongoose";
const salespersonStockRequestSchema = new mongoose.Schema({
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
export default mongoose.model("SalespersonStockRequest", salespersonStockRequestSchema);
//# sourceMappingURL=SalespersonStockRequest.js.map