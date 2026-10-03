import mongoose from "mongoose";
const salespersonStockSchema = new mongoose.Schema({
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
export default mongoose.model("SalespersonStock", salespersonStockSchema);
//# sourceMappingURL=SalespersonStock.js.map