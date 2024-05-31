import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {OrderDetails} from "../models/order.model.js"

const OrderFood = async (req,res)=>{
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
        userFullName:user.fulName,
        phoneNumber:user.phoneNumber
    }
    )
    const createOrder = await OrderDetails.findById(order._id)
    if(!createOrder){
        throw new ApiError(404,"Unable to proccess your order")
    }
    return res.status(201).json(new ApiResponse(200,{},"Order In process"))
}

const CancelOrder = async(req,res)=>{
    const user = req.user
    const id = req.params.id
    const userEmail = user.email
    const orderEmail = OrderDetails.findById(id).email
    if(userEmail !== orderEmail){
        throw new ApiError(404,"Invalid Request")
    }
    try {
        await OrderDetails.deleteOne({_id:id})
        return res.status(201)
        .json(new ApiResponse(201,{},"Ordered Food canceled successfully"))
    } catch (error) {
        new ApiError(500,"Unable to delete from database")
    }
}