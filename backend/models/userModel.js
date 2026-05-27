import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilepic: { type: String, default: "" }, //clodinary image url
    profilepicPublicID: { type: String, default: "" }, //clodinary public_id for deletation 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"

    },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    address: { type: String, default: "" },
    city: { type: String },
    pinCode: { type: String },
    phoneNumber: { type: String }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)
