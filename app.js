import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

app.use(cors({
    origin:[process.env.CORS_ORIGIN],
    methods:["GET","PUT","POST","DELETE","PATCH"],
    credentials:true
}));

// Configuration
app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./src/routes/user.routes.js"
import orderRouter from "./src/routes/order.routes.js"

app.use("/api/v1",userRouter)
app.use("/api/v1",orderRouter)

export {app};