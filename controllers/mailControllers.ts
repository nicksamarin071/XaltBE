import type{ Request, Response } from "express";
import { sendEmail, sendEmailExprt } from "../service/mailService.js";
import { EMAIL_USER } from "../utils/constants.js";
import path from "path";
import { resSend } from "../middlewares/response/resSend.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";


export const sendEmailController = async (req: Request,res: Response) => {
  try {
    const {  email } = req.body;

    await sendEmail([process.env.EMAIL_USER as string, ],
      "New Newsletter Subscriber",
      `<h2>New Newsletter Subscriber</h2>
       <p>Email: ${email}</p>
      ` );
    return resSend(res, 200,"Email sent successfully", sendEmail);
  } catch (error) {
    return resSend(res, 500, "Failed to send email", null);
  }
};


export const downloadBrochureController = (req: Request,res: Response) => {
  const filePath = path.join(process.cwd(),"public","Yotrips.pdf" );
  res.download(filePath);
};



export const sendEmailConsultWithExpert = async (req: Request,res: Response) => {
  try {
    const user_id = req.session?._id;
    if (!user_id) {
      return resSend(res, 401, "Unauthorized", null);
    }

    const {product_id} = req.body;
    const productDetails = await productModel.findById(product_id);
    if (!productDetails) {
      return resSend(res, 404, "Product Not Found", null);
    }

    const user = await userModel.findById(user_id);
    if (!user) {
      return resSend(res, 404, "User Not Found", null);
    }

    await sendEmailExprt(
      user_id as string,
      process.env.EMAIL_USER as string,
      "Consult With Expert Request",
      `
        <h2>Consult With Expert Request</h2>
        <p><strong>User ID:</strong> ${user_id}</p>
        <p><strong>Product ID:</strong> ${product_id}</p>
        <p><strong>Product Name:</strong> ${productDetails.productName}</p>
        <p><strong>User Email:</strong> ${user.email}</p>
      `
    );

    return resSend(res, 200, "Email sent successfully", null);
  } catch (error) {
    console.error(error);
    return resSend(res, 500, "Failed to send email", null);
  }
};