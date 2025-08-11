import { errorHandler } from "../Helper/errorHandler.js";
import Blog from "../model/blog.model.js";
import cloudinary from "../config/cloudnary.js";
import { encode } from "entities";
import Category from "../model/Category.model.js";

export const Addblog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let filecontent = "";
    if (req.file) {
        const uploadResult = await cloudinary.uploader
        .upload(
          req.file.path,{
          folder: "Blog-WebApp",
          resource_type: "auto",
        })
        .catch ((error) => {
        // ✅ if upload fails, stop here and send error
        next(errorHandler(500, error.message));
        })
      filecontent = uploadResult.secure_url;
    }
    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      filecontent: filecontent,
      content: encode(data.content),
    });
    
    await blog.save()
    return res.status(200).json({
      success: true,
      message: "Blog added successfully",
      // blog,
    });

  } catch (err) {
    // ✅ if anything else fails, send error and STOP
      next(errorHandler(500, err.message));
       console.error("Error saving blog:", err.message);
  }
};
export const Showblog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).populate('category','name').lean().exec();
    if (!blog) {
      next(errorHandler(404, "Data not Found"));
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const Updateblog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    // console.log(data)
    const blog_id = req.params.blog_id;

    const blog = await Blog.findById(blog_id);
     let filecontent = blog?.filecontent
     if (req.file) {
        const uploadResult = await cloudinary.uploader
        .upload(
          req.file.path,{
          folder: "Blog-WebApp",
          resource_type: "auto",
        })
        .catch ((error) => {
        // ✅ if upload fails, stop here and send error
        next(errorHandler(500, error.message));
        })
      filecontent = uploadResult.secure_url;
    }
    const UpdatedBlog = await Blog.findByIdAndUpdate(blog_id,{
      category :  data.category,
      title :  data.title,
      slug :  data.slug,
      filecontent :  filecontent,
      content :  encode(data.content),
    },{new : true})
   
    await UpdatedBlog.save();
    
    res.status(200).json({
      success: true,
      message: "blog updated Successfully..",
      blog: UpdatedBlog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const Deleteblog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Deleteblog = await Blog.findOneAndDelete({ _id: id });
    if (!Deleteblog) {
      return res.status(404).json({
        success: false,
        message: "blog not Delete or Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "blog Deleted Successfully..",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const Allblog = async (req, res, next) => {
  try {
    const blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ title: -1 }).lean().exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const AllblogofUser = async (req, res, next) => {
  try {
    const user = req.user
    let blog = "";
   if(user.role === 'Admin'){
    blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ title: -1 }).lean().exec();
    res.status(200).json({
      blog,
    });
  }else{
    blog = await Blog.find({author:user._id}).populate('author', 'name avatar role').populate('category', 'name slug').sort({ title: -1 }).lean().exec();
    res.status(200).json({
      blog,
    });
  }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const singleblog = async (req, res, next) => {
 try {
    const { id } = req.params;
    const blog = await Blog.findById( id).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
    if (!blog) {
      next(errorHandler(404, "Data not Found"));
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const Relatedblog = async (req, res, next) => {
 try {
    const { blogCategoryId } = req.params;
    const blog = await Blog.find({ category: blogCategoryId }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
    if (!blog) {
      next(errorHandler(404, "Data not Found"));
    }
    res.status(200).json({
      blog,
      
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const BlogByCategory = async (req, res, next) => {
 try {
    const { category_id } = req.params;
    const categoryData = await Category.findById(category_id);
    const blog = await Blog.find({ category: category_id }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
    if (!blog) {
      next(errorHandler(404, "Data not Found"));
    }
    // console.log(blog)
    res.status(200).json({
      blog,
      categoryData,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const search = async (req, res, next) => {
 try {
    const { q} = req.query;
    // console.log(q)
    const blog = await Blog.find({ title: {$regex: q, $options: 'i'} }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
    // console.log('blog',blog)
    if (!blog) {
      next(errorHandler(404, "Data not Found"));
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

