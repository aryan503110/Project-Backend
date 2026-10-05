import nodemailer from "nodemailer";
import dns from 'dns'

dns.setDefaultResultOrder("ipv4first");

dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
  console.log("SMTP DNS:", err || addresses);
});

const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST,
    host: "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
};
