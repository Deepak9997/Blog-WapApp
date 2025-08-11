import express from "express";
import { GoogleLogin, Login, LogOut, Resigter } from "../controller/Auth.controler.js";

const AuthRouter = express.Router();

AuthRouter.post("/Register", Resigter);
AuthRouter.post("/Login", Login);
AuthRouter.post("/googleLogin", GoogleLogin);
AuthRouter.get("/LogOut", LogOut);

export default AuthRouter;
