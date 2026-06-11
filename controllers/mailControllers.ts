import type{ Request, Response } from "express";
import { sendEmail } from "../service/mailService.js";
import { EMAIL_USER } from "../utils/constants.js";
// import  PDFDocument from "pdfkit";
import path from "path";
import { resSend } from "../middlewares/response/resSend.js";


export const sendEmailController = async (req: Request,res: Response) => {
  try {
    const {  email } = req.body;

    await sendEmail([EMAIL_USER as string, ],
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


