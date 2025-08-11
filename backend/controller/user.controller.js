import bcryptjs from "bcryptjs";
import { errorHandler } from "../Helper/errorHandler.js";
import User from "../model/user.model.js";
import cloudinary from "../config/cloudnary.js";

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid }).lean().exec();
    if (!user) {
      next(errorHandler(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User Data found",
      user,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const updateUser = async (req, res, next) => {
  try {
    if (!req.body.data) {
      return next(errorHandler(400, "No data provided"));
    }
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;

    const user = await User.findById(userid);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;
    if (data.password && data.password.length >= 8) {
      const hashedpassword = bcryptjs.hashSync(data.password);
      user.password = hashedpassword;
    }
    if (req?.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "Blog-WebApp",
          resource_type: "auto",
        })
        .catch((error) => {
          next(errorHandler(500, error.message));
          return null;
        });
      if (!uploadResult) return;
      user.avatar = uploadResult.secure_url;
    }
    await user.save();
    const newuser = user.toObject({ getters: true });
    delete newuser.password;
    res.status(200).json({
      success: true,
      message: "Data updated",
      user: newuser,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find()
    if (!user) {
      next(errorHandler(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User Data found",
      user,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const DeleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({_id: id})
    if (!user) {
      next(errorHandler(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User Deleted Successfull...",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};