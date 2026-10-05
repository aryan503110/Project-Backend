import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
export default mongoose.model("Product", ProductSchema);
//# sourceMappingURL=Product.js.map