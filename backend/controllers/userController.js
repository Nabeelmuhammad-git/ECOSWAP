import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyEmail from "../emailVerify/verifyEmail.js";
dotenv.config();



export const register = async (req, res) => {
    try {
        console.log("register is called with body:", req.body); // Debugging log

        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })

        }

        const user = await User.findOne({ email })

        if (user) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            })

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })


        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        );
        await verifyEmail(token, email)
        newUser.token = token


        newUser.token = token

        await newUser.save()

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        })

    } catch (error) {
        console.log("error verify email", error)
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


export const verify = async (req, res) => {

    try {

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const verifyMailer = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(400).json({
                success: false,
                message: "Authorization token is missing or invalid"
            })
        }
        const token = authHeader.split(' ')[1];
        let decoded
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({
                    success: false,
                    message: "Token has expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "token verification failed"
            })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        user.token = null
        user.isVerified = true
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const reVerify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        );
        user.token = token
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Verification email resent successfully",
            token: user.token
        })
        await verifyEmail(token, email)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const ispasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!ispasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        if (existingUser.isVerified === false) {
            return res.status(400).json({
                success: false,
                message: "Verify your account then login"
            });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { id: existingUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '10d' }
        );

        const refreshToken = jwt.sign(
            { id: existingUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );

        existingUser.isLoggedIn = true;

        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: `Welcome back ${existingUser.firstName}`,
            user: existingUser,
            accessToken,
            refreshToken
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//export const logout = async (req, res) => {
    //try{
        //const userId = req.user.id
        // Perform logout logic here, e.g., invalidate tokens, clear session, etc.
        //res.status(200).json({
            //success: true,
            //message: "Logged out successfully"
        //})
    //} catch (error){
        //res.status(500).json({
            //success: false,
            //message: error.message
        //})
    //}
//}