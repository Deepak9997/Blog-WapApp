import Jwt from "jsonwebtoken";
import { errorHandler } from "../Helper/errorHandler.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const Resigter = async (req,res, next) => {
    try {
        const {name,email,password,phone} = req.body;
        const user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            });
        }
        const hashedpassword = bcryptjs.hashSync(password,10);
        let newUser;
        try {
            newUser = await User.create({
                name,
                email,
                password:hashedpassword,
                phone
            });
        } catch (err) {
            // Handle duplicate key error (race condition)
            if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                return res.status(409).json({
                    success: false,
                    message: "User Already Exists"
                });
            }
            return next(errorHandler(500, err.message));
        }

        await newUser.save();
       
        res.status(201).json({
            success:true,
            message:"Registration Successful..",
        })


    } catch (error) {
        next(errorHandler(500,error.message))
    }
}
export const Login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return next(errorHandler(402, 'Invalid Login Credentials'));
            
        }
        const hashedpassword = user.password;
        const Uservalid = await bcryptjs.compareSync(password,hashedpassword);
        if(!Uservalid){
            return res.status(404).json({
                success: false,
                message: "Invalid   login Credentials"
            });
        }
        const secret_key = process.env.SECRET_KEY;
        const token = Jwt.sign({
            _id:user._id,
            email:user.email, 
            phone:user.phone,
            avatar:user.avatar,
            role: user.role,
        },secret_key)

        res.cookie("access_token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            path:"/"
        })
        const newuser = user.toObject({getters:true});
        delete newuser.password;
        res.status(200).json({
            success:true,
            user:newuser,
            message:"Login Successful..",
        })
       
    } catch (error) {
       return next(errorHandler(500,error.message))
    }
}
export const GoogleLogin = async (req,res,next) => {
    try {
        const {email,photoUrl,name,phoneNumber} = req.body;
        let user = await User.findOne({email});

        if(!user){
            // Create new User
            const password = Math.random().toString()
            const hashedpassword = bcryptjs.hashSync(password,10);
            const newUser = await User.create({
                name,
                email,
                password:hashedpassword,
                avatar: photoUrl,
                phone:phoneNumber
            });
            user = await newUser.save();
        }
        
        const secret_key = process.env.SECRET_KEY;
        const token = Jwt.sign({
            _id:user._id,
            email:user.email, 
            avatar:user.avatar,
            phone:user.phone,
            role: user.role,
        },secret_key)

        res.cookie("access_token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            path:"/"
        })
        const newuser = user.toObject();
        delete newuser.password;
        res.status(200).json({
            success:true,
            user:newuser,
            message:"Login Successful..",
        })
     
    } catch (error) {
        next(errorHandler(500,error.message))
    }
}
export const LogOut = async (req,res,next) => {
    try {
       
        res.clearCookie("access_token",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            path:"/"
        })
        res.status(200).json({
            success:true,
            message:"Logout Successful..",
        })
    } catch (error) {
        next(errorHandler(500,error.message))
    }
}