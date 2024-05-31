import mongoose from "mongoose";

const connectDb = async () => {
    const DB_NAME = "FastFoodRestaurant"
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected successfully !! DB Host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log(`Error while connecting to MongoDB: ${error.message}`)
        process.exit(1);
        }
}

export default connectDb;