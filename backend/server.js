import express, { Router } from 'express'
import connectDB from './database/db.js'
import 'dotenv/config'
import userRoute from './routes/userRoute.js'

const app = express()

const PORT = process.env.PORT || 3000

//middleware

app.use(express.json())
app.use('/api/v1/users', userRoute)

// http://localhost:8000/api/v1/users/register

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Server not started because MongoDB connection failed.")
        process.exit(1)
    }
}

startServer()




