import express from "express"
import { register, verify } from "../controllers/userController.js"

const userRoute = express.Router()

userRoute.post('/register',register)
userRoute.get('/verify',verify)


export default userRoute