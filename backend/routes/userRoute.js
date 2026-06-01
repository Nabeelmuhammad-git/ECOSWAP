
import express from "express";

import {
    register,
    verifyMailer,
    reVerify,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    changePassword
} from "../controllers/userController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRoute = express.Router();

userRoute.post('/register', register);

userRoute.post('/verify', verifyMailer);

userRoute.post('/reverify', reVerify);

userRoute.post('/login', login);

userRoute.post('/logout',isAuthenticated, logout);

userRoute.post('/forgot-password', forgotPassword); 

userRoute.post('/verify-otp/:email', verifyOTP);

userRoute.post('/change-password/:email', changePassword);


export default userRoute;