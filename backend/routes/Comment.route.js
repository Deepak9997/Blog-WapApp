import express from "express";
import { AddComment, AllCommentofBlog, ContComment, DeleteComment, ShowComment, UpdateComment } from "../controller/Comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/add", AddComment);
commentRouter.get("/allcommentofblog/:blogid", AllCommentofBlog);
commentRouter.get("/editcomment/:id", ShowComment);
commentRouter.delete("/delete/:id", DeleteComment);
commentRouter.put("/update/:id", UpdateComment);


commentRouter.get("/count/:blogid", ContComment);

export default commentRouter;
