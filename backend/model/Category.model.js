import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
    name:{
        type:"string",
        required:true,
        trim:true,
    },
    slug:{
        type:"string",
        required:true,
        trim:true,
        unique:true,
    }
}) 
 const Category = mongoose.model("Category", categorySchema, "categories");
 export default Category;