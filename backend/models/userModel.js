import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    profilepic: {
        type: String,
        default: "" // cloudinary image URL
    },

    profilepicPublicID: {
        type: String,
        default: "" // cloudinary public_id for deletion
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    token: {
        type: String,
        default: null
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String,
        default: null
    },

    otpExpiry: {
        type: Date,
        default: null
    },

    address: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: ""
    },

    pinCode: {
        type: String,
        default: ""
    },

    phoneNumber: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);