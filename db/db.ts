import mongoose from "mongoose";

const connectToDB=async()=>{
    try{
        await mongoose.connect("")
        console.log("DB Connected")
    }catch(err){
        console.log(err)
    }
}