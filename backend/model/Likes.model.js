import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true,
    },
    Like:{
        type:"string",
        required:true,
        trim:true,
    },
},{ timestamps: true }) 
 const Like = mongoose.model("Like", LikeSchema, "Likes");
 export default Like;