import mongoose from "mongoose";
const cateogrySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Category", cateogrySchema);
//# sourceMappingURL=Category.js.map