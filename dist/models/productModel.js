import mongoose, { Document, Schema } from "mongoose";
const productSchema = new mongoose.Schema({
    category_id: {
        type: String,
        ref: "Category",
        required: true
    },
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    image: {
        type: Array,
    },
    price: {
        type: Number,
        required: true,
    },
    discount_price: {
        type: Number,
    },
    gst_Percentage: {
        type: Number,
    },
    brands: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
    },
    sku: {
        type: Number,
    },
    gst_price: {
        type: Number,
        default: 0,
    },
    filters: {
        type: Object
    },
    is_new: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
export default mongoose.model("Product", productSchema);
//# sourceMappingURL=productModel.js.map