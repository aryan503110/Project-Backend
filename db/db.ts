import mongoose from "mongoose";

const connectToDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://admin:aryanartisanjay>@clusterone.wzoecrf.mongodb.net/ProjectTS?appName=ClusterOne")
        console.log("DB Connected")
    }catch(err){
        console.log(err)
    }
}