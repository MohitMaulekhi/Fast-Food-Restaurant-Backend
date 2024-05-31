import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = async(req,res,next)  =>{
    try{
        const accessToken = req.cookies?.accessToken
        if(!accessToken){
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password"
        )
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user = user;
        next()
    }
    catch{
        throw new ApiError(401,"Invalid Access")
    }
}

export {verifyJWT}