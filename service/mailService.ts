import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../utils/constants.js";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string | string[],
  subject: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html,
  });

  return info;
};