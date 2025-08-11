import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    title:{
        type:"string",
        required:true,
        trim:true,
    },
    slug:{
        type:"string",
        required:true,
        trim:true,
    },
    filecontent:{
        type:"string",
        required:true,
        trim:true,
    },
    content:{
        type:"string",
        required:true,
        trim:true,
    }
},{ timestamps: true }) 
 const Blog = mongoose.model("Blog", BlogSchema, "Blogs");
 export default Blog;