import mongoose, { Schema, Document } from "mongoose";
const wishlistSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("Wishlist", wishlistSchema);
//# sourceMappingURL=wishlistModel.js.map