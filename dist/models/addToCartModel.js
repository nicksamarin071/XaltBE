import mongoose, { Schema, Document } from "mongoose";
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
const Cart = mongoose.models.Cart ||
    mongoose.model("Cart", CartSchema);
export default Cart;
// export default Cart;
//# sourceMappingURL=addToCartModel.js.map