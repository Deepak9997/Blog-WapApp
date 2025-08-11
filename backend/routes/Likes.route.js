import express from "express";
import { CountLikes,  LikesAdd } from "../controller/Like.controller.js";

const LikesRouter = express.Router();

LikesRouter.post("/add", LikesAdd);
LikesRouter.get("/count/:blogid", CountLikes);



export default LikesRouter;
