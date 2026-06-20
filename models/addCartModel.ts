import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  price: number; 
}

interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  items: ICartItem[];
  total_amount: number;
};

const CartSchema = new Schema<ICart>(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", CartSchema);