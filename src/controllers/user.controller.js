import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser =asyncHandler( async (req,res) =>{
    const {fullName,email,phoneNumber,address,password} = req.body

    if(
        !fullName || !email || !phoneNumber || !password || !address
    ){
        throw new ApiError(400,"All fields are necessary")
    }
    const emailRegex = new RegExp()
    if(!emailRegex.test(email)){
        throw new ApiError(400,"Invalid Email")
    }
    const existedUser = await User.findOne({
        $or:[{phoneNumber},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or phone number already exist")   
    }
    const user = await User.create(
        {   fullName,
            email,
            phoneNumber,
            address,
            password
        }
    )
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError("500", "Error while registering User. Try again Later")
    }
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    const emailRegex = new RegExp()
    if(!emailRegex.test(email)){
        throw new ApiError(400,"Invalid Email")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const boolpass = await user.ispasswordCorrect(password)
    if (!boolpass) {
        throw new ApiError(405, "Invalid credentials")
    }
    const accessToken = user.generateAcessToken()
    const loggedInUser = await User.findById(user._id).select(
        "-password"
    )
    return res.status(200)
    .cookie("accessToken", accessToken,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:"none",
        secure:true,
    })
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler( async(req,res)=>{
    return res.status(200)
    .clearCookie("accessToken",{
        sameSite:"none",
        secure:true,
    })
    .json(
        new ApiResponse(200,{},"User Logged Out")
    )
})

const getCurrentUser = asyncHandler( async (req, res) => {
    const user = req.user
    return res
        .status(200)
        .json(new ApiResponse(200, user, "current user fetched successfully"))
})


export{
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}