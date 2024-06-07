import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {OrderDetails} from "../models/order.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const OrderFood = asyncHandler(async (req,res)=>{
    const {orderList,total} = req.body
    const user = req.user
    if(!orderList || !total){
        throw new ApiError(400,"Invalid order")
    }
    const order = await OrderDetails.create(
    {
        orderList,
        total,
        address:user.address,
        userFullName:user.fullName,
        phoneNumber:user.phoneNumber,
        email:user.email
    }
    
    )
    const createOrder = await OrderDetails.findById(order._id)
    if(!createOrder){
        throw new ApiError(404,"Unable to proccess your order")
    }
    return res.status(201).json(new ApiResponse(200,createOrder,"Order In process"))
})

const CancelOrder =asyncHandler(async(req,res)=>{
    const user = req.user
    const id = req.params.id
    const userEmail = user.email
    const order = await OrderDetails.findById(id)
    if(userEmail !== order.email){
        throw new ApiError(404,"Invalid Request")
    }
    try {
        await OrderDetails.deleteOne({_id:id})
        return res.status(204)
        .json(new ApiResponse(204,{},"Ordered Food canceled successfully"))
    } catch (error) {
        new ApiError(500,"Unable to delete from database")
    }
})

const fetchAllOrder = asyncHandler(async (req,res)=>{
    const user = req.user
    const userEmail = user.email
    const orders = await OrderDetails.find({email:userEmail})
    res.status(200)
    .json(new ApiResponse(200,orders,"All orders fetched successfully"))
})
export {
    OrderFood,
    CancelOrder,
    fetchAllOrder
}