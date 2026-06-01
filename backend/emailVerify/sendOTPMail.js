import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendOTPMail = async (otp, email) => {

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
            subject: "password reset OTP",
            html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Verification otp send successfully");

    } catch (error) {

        console.error("Email error:", error.message);

    }

};

export default sendOTPMail;