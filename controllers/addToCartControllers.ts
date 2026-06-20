import type{ Request, Response } from "express";
import { resSend } from "../middlewares/response/resSend.js";
import  {addToCartService, getCartService}  from "../service/addToCartService.js";



export const addToCartController = async (req:Request, res: Response) => {
    try {
    const user_id = req.session?._id as string;
    const {product_id, quantity } = req.body;
    const qty = Number(quantity);

    if (![1, -1, 0].includes(qty)) {
    return resSend(res, 400, "Quantity must be 1, -1 or 0", null);
    }
    const cart = await addToCartService(user_id, product_id, qty,);
    return resSend(res, 200, "Product AddToCart Successfuly", [cart])
    }
    catch (error: any) {
    return resSend(res, 404,  error.message, null);
    };
};


export const getToCartController = async (req:Request, res: Response) => {
  try {
    const userId = req.session?._id;

    const cart = await getCartService(userId as string);
    if(!cart){
      return resSend(res, 404, '', null);
    }
    return resSend(res, 201, '', cart);
  } catch (error) {
    return resSend(res, 500, '', null);
  }
};


