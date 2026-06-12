import mongoose, { Document, Schema } from "mongoose";
;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
    },
    image: {
        type: [String],
    },
    status: {
        type: String,
        enum: [
            "active",
            "inactive",
        ],
        default: "active",
    },
}, {
    timestamps: true,
});
export default mongoose.model("Category", categorySchema);
//# sourceMappingURL=categoryModel.js.map