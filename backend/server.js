// To use import like this add [type: modules] in the package.json
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'



// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())  // cors is used to connect frontend to backend

// api endpoints
app.use('/api/admin', adminRouter)


app.get('/',(req, res)=>{
    res.send("API IS WORKING")
})

app.listen(port, ()=> console.log("Server is running on port", port))