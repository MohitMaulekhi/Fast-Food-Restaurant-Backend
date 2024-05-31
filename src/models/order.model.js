import mongoose,{Schema} from "mongoose";

const orderDetailsSchema = new Schema(
    {
        orderlist:{
            orderList:[
                {
                    productName:{
                        type:String
                    },
                    quantity:{
                        type:Number
                    },
                }
            ],
            total:{
                type:Number,
                required:true
            },
            address:{
                type:String,
                required:True
            },
            userFullName:{
                type:String,
                required:true
            },
            phoneNumber:{
                type:String,
                unique:[true,"Phone number is already in use"],
                validate:{
                    validator:function(phoneNumber){
                        const phRegex = new RegExp("[0-9]{10}")
                        return phoneNumber.length === 10 && phRegex.test(phoneNumber);
                    }
                }
            }

        }
    }
,{timestamps:true})

export const OrderDetails = mongoose.model("OrderDetails",orderDetailsSchema)