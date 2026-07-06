import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string | string[],
  subject: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_PASS,
    to,
    subject,
    html,
  });

  return info;
};


 export const sendEmailExprt = async ( 
  user_id: string,
  to: string | string[],
  subject: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_PASS,
    to,
    subject,
    html,
  });

  return info
    
    
 }