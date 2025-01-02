// To use import like this add [type: modules] in the package.json
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// app config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())  // cors is used to connect frontend to backend

// api endpoints
app.get('/',(req, res)=>{
    res.send("API IS WORKING")
})

app.listen(port, ()=> console.log("Server is running on port", port))