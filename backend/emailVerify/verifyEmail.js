import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const verifyEmail = async (token, email) => {

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Verify Email",
            text: `Click this link to verify your email:
http://localhost:5173/verify/${token}`
        };

        await transporter.sendMail(mailOptions);

        console.log("Verification email sent");

    } catch (error) {

        console.error("Email error:", error.message);

    }

};

export default verifyEmail;