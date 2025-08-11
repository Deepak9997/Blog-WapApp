import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    
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
    comment:{
        type:"string",
        required:true,
        trim:true,
    },
},{ timestamps: true }) 
 const Comment = mongoose.model("Comment", CommentSchema, "Comments");
 export default Comment;