import type{ Request, Response } from "express";
import { resSend } from "../middlewares/response/resSend.js";
import addCartModel from "../models/addCartModel.js";
import userModel from "../models/userModel.js";


export const addToCartController = async (req:Request, res: Response) => {
    try {
        const {user_id}= req.body;
        const user = await userModel.findById({_id: user_id});
        if(!user){
            return resSend(res, 400, "User Not Found", null);
        };

    } catch (error) {
        return resSend(res, 500, '', null);
    }
};