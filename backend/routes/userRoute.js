
import express from "express";

import {
    register,
    verifyMailer,
    reVerify,
    login
    //logout   
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post('/register', register);

userRoute.post('/verify', verifyMailer);

userRoute.post('/reverify', reVerify);

userRoute.post('/login', login);

//userRoute.post('/logout', logout);

export default userRoute;