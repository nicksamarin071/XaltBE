import CartModel from "../models/addToCartModel.js"; 
import productModel from "../models/productModel.js";
import { calculateTotal } from "../utils/helper.js";



export const addToCartService = async (userId: string, productId: string, quantity: number) => {

  const product = await productModel.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await CartModel.findOne({user_id: userId,});
  if (!cart) {
    cart = await CartModel.create({user_id: userId, items: [],});
  }
  const qty = Number(quantity);
  const existingItem = cart.items.find(
  (item: any) => item.product_id.toString() === productId
);

if (existingItem) {
  if (qty === 0) {
    return cart;
  }

  existingItem.quantity += qty;

    if (existingItem.quantity <= 0) {
      cart.items = cart.items.filter(
        (item: any) =>
          item.product_id.toString() !== productId
    );

    } else {
      existingItem.price = product.price * existingItem.quantity;
    }

  } else {
    if (quantity > 0) {
      cart.items.push({
        product_id: product._id,
        quantity,
        price: product.price * quantity,
      });
    }
  }

  cart.total_amount = calculateTotal(cart.items);
  await cart.save();
  return cart;
};



export const getCartService = async (
  userId: string
) => {
  const cart = await CartModel.findOne({user_id: userId,}).populate("items.product_id");
  return cart;
};


