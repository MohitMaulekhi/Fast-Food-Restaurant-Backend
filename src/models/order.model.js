import mongoose,{Schema} from "mongoose";

const orderListSchema = new Schema({
    productName:{
        type:String
    },
    quantity:{
        type:Number
    },
})
const orderDetailsSchema = new Schema(
    {
            orderList:[
                orderListSchema
            ],
            total:{
                type:Number,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            address:{
                type:String,
                required:true
            },
            userFullName:{
                type:String,
                required:true
            },
            phoneNumber:{
                type:String
            }
    }
,{timestamps:true})

export const OrderDetails = mongoose.model("OrderDetails",orderDetailsSchema)