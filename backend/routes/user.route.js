import express from "express";
import { DeleteUser, getAllUser, getUser, updateUser} from "../controller/user.controller.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/getuser/:userid", getUser);
userRouter.put("/updateUser/:userid",upload.single('file'), updateUser);

userRouter.get("/getalluser", getAllUser);
userRouter.delete("/deleteuser/:id", DeleteUser);

export default userRouter;
