import nodemailer from "nodemailer";
import dns from 'dns';
dns.setDefaultResultOrder("ipv4first");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
    });
};
//# sourceMappingURL=SendMail.js.map