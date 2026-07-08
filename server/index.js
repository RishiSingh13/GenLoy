import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import authRouter from "./routes/auth_routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user_routes.js"
import websiteRouter from "./routes/website_route.js"
import billingRouter from "./routes/billing_route.js"
import { stripeWebhook } from "./controllers/stripeWebhook_controller.js"
dotenv.config()
const app=express()
app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port=process.env.PORT || 5000
app.use(cors({
    origin:"https://genloy-0.onrender.com",
    credentials:true
}))



app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)

app.listen(port,()=>{
    console.log("server starated");
    connectdb() 
})
