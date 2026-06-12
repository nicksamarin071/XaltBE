import mongoose, { Schema, Document } from "mongoose";
;
const CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    total_amount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export default mongoose.model("Cart", CartSchema);
//# sourceMappingURL=addCartModel.js.map