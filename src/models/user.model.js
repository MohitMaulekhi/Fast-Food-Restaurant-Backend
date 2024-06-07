import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        fullName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
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
        },
        address:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required: [true,"Password is required"]
        },
    },
{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,2)
    next();
})


userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// Genearing Access Token for user login and user authentication.
userSchema.methods.generateAcessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        phoneNumber:this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: "1d"
    }
    )
}

export const User = mongoose.model("User",userSchema)