
import express from "express";
import { AddCategory, AllCategory, AllCategoryData, DeleteCategory, ShowCategory, UpdateCategory } from "../controller/Category.controller.js";
import { Authenticated } from "../middleware/Authenticated.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", AddCategory);
categoryRouter.put("/update/:categoryid",UpdateCategory);
categoryRouter.delete("/delete/:id",DeleteCategory);
categoryRouter.get("/allcategory",Authenticated,AllCategory);
categoryRouter.get("/allcategorydata",AllCategoryData);
categoryRouter.get("/show/:categoryid",ShowCategory);


export default categoryRouter;
