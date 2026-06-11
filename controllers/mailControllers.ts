import type{ Request, Response } from "express";
import { sendEmail } from "../service/mailService.js";
import { EMAIL_USER } from "../utils/constants.js";
// import  PDFDocument from "pdfkit";
import path from "path";
import { resSend } from "../middlewares/response/resSend.js";


export const sendEmailController = async (req: Request,res: Response) => {
  try {
    const {  email } = req.body;
    // const exists = await Newsletter.findOne({ email });
    // if(exists){
    //     return resSend(res, 400, "Email Already Sent", null);
    // }
    // await Newsletter.create({ email });

    await sendEmail([EMAIL_USER as string, "shikha@bellatorgroup.in", ],
        "New Newsletter Subscriber",
      `<h2>New Newsletter Subscriber</h2>
       <p>Email: ${email}</p>
      ` );
    return resSend(res, 200,"Email sent successfully", sendEmail);
  } catch (error) {
    return resSend(res, 500, "Failed to send email", null);
  }
};


// export const downloadBrochureController = async (req:Request, res: Response) => {
//   const doc = new PDFDocument();
//   res.setHeader("Content-Type", "application/pdf");

//   res.setHeader("Content-Disposition",'attachment; filename="Yotrips.pdf"');

//   doc.pipe(res);

//   doc.fontSize(24).text("Gym Brochure");
//   doc.moveDown();

//   doc.fontSize(14).text("Welcome to our Gym");
//   doc.text("Membership Plans");
//   doc.text("Personal Training");
//   doc.text("Nutrition Support");

//   doc.end();
// };


export const downloadBrochureController = (req: Request,res: Response) => {
  const filePath = path.join(process.cwd(),"public","Yotrips.pdf" );
  res.download(filePath);
};


