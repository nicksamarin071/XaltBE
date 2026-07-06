import nodemailer from "nodemailer";

const getConfig = () => ({
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
});

export const sendEmail = async (
  to: string | string[],
  subject: string,
  html: string
) => {
  const { EMAIL_USER, EMAIL_PASS } = getConfig();

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Missing email credentials");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  return await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html,
  });
};

export const sendEmailExprt = async (
  user_id: string,
  to: string | string[],
  subject: string,
  html: string
) => {
  const { EMAIL_USER, EMAIL_PASS } = getConfig();

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Missing email credentials");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  return await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html,
  });
};
