import { errorHandler } from "../Helper/errorHandler.js";
import Category from '../model/Category.model.js'
export const AddCategory = async (req, res, next) => {
  try {
    const {author,name , slug} =  req.body;
    const category = new Category({
      name, slug, author
    })
    await category.save()
    res.status(200).json({
      success: true,
      message:"Category added Successfully.."
    })
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const ShowCategory = async (req, res, next) => {
  try {
     const { categoryid } = req.params
     const category = await Category.findById(categoryid)
      if(!category){
        next(errorHandler(404, 'Data not Found'))
      }
      res.status(200).json({
        category 
      })
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const UpdateCategory = async (req, res, next) => {
  try {
     const {name , slug} =  req.body;
     const categoryid = req.params.categoryid

    const updateCategory = await Category.findOneAndUpdate({_id:categoryid},{
      name, slug
    },{new : true})
    await updateCategory.save()
    if(!updateCategory){
       return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message:"Category added Successfully..",
      category: updateCategory,
    })
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const DeleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Deletecategory = await Category.findOneAndDelete({_id: id})
    if(!Deletecategory){
       return res.status(404).json({
        success: false,
        message: "Category not Delete or Found",
      });
    }
    res.status(200).json({
      success: true,
      message:"Category Deleted Successfully..",
    })
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const AllCategory = async (req, res, next) => {
  try {
    const user = req.user;
    let category = ""
    if(user && user.role === 'Admin'){
      category = await Category.find().sort({name: 1}).populate('author', 'name avatar role').sort({ title: -1 }).lean().exec();
      res.status(200).json({
        category
      })
    }else{
      category = await Category.find({author:user._id}).sort({name: 1}).lean().exec()
      res.status(200).json({
        category
      })
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const AllCategoryData = async (req, res, next) => {
  try {
      const category = await Category.find().sort({name: 1}).lean().exec();
      res.status(200).json({
        category
      })
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};