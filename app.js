import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.get("/",(req,res)=>{
    res.send("<div>Hello</div>")
})

app.use(cors({
    origin:[process.env.CORS_ORIGIN],
    methods:["GET","PUT","POST","DELETE","PATCH"],
    credentials:true
}));

// Configuration
app.use(express.json)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./src/routes/user.routes.js"
app.use("/api/v1",userRouter)

export {app};