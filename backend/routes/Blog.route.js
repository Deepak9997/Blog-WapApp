
import express from "express";
import { Addblog, Allblog, AllblogofUser, BlogByCategory, Deleteblog, Relatedblog, search, Showblog, singleblog, Updateblog } from "../controller/Blog.controller.js"
import upload from "../config/multer.js";
import { Authenticated } from "../middleware/Authenticated.js";
const blogRouter = express.Router();

blogRouter.post("/add", upload.single('file'), Addblog);
blogRouter.get("/show/:blogid",Showblog);
blogRouter.put("/update/:blog_id", upload.single('file'),Updateblog);
blogRouter.delete("/delete/:id",Deleteblog);
blogRouter.get("/AllblogofUser",Authenticated,AllblogofUser);
blogRouter.get("/allblog",Allblog);
blogRouter.get("/showblog/:id",singleblog);

blogRouter.get("/relatedblog/:blogCategoryId",Relatedblog);
blogRouter.get("/blogbycategory/:category_id",BlogByCategory);
blogRouter.get("/search",search);


export default blogRouter;
