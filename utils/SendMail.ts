// import nodemailer from "nodemailer";
// import dns from 'dns'

// dns.setDefaultResultOrder("ipv4first");

// dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
//   console.log("SMTP DNS:", err || addresses);
// });

// const transporter = nodemailer.createTransport({
//   // host: process.env.SMTP_HOST,
//     host: "smtp.gmail.com",
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export const sendEmail =  (to: string, subject: string, text: string) => {
//    transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to,
//     subject,
//     text,
//   });
// };

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
) => {
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text,
  });

  console.log("RESEND RESULT:", result);
};