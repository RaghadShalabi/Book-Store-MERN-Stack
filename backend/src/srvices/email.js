import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SEND_EMAIL,
            pass: process.env.SEND_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: `"Book Store 📖" <${process.env.SEND_EMAIL}> `, // sender address
        to,
        subject,
        html,
    });
    return info;
};