import mongoose from "mongoose";

interface category {
  categoryName: string;
}

const cateogrySchema = new mongoose.Schema<category>({
  categoryName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<category>("Category", cateogrySchema);
