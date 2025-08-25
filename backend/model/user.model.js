import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    role:{
        type:"string",
        enum:["User","Admin"],
        default:"User",
        required:true,
        trim:true,
    },
    name:{
        type:"string",
        required:true,
        trim:true,
    },
    email:{
        type:"string",
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:"string",
        required:true,
        trim:true,
    },
    avatar:{
        type:"string",
        trim:true,
    },
    bio:{
        type:"string",
        trim:true,
    },
    phone:{
        type:"string",
        trim:true,
    },
},{ timestamps: true })  
 const User = mongoose.model("User", categorySchema, "users");
 export default User;
