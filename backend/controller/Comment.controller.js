import { errorHandler } from "../Helper/errorHandler.js";
import Comment from "../model/Comment.model.js";

export const AddComment = async (req, res, next) => {
 try {
    const { author, blogid , comment} = req.body;
    const newComment = new Comment({
       author, blogid,comment
    })
  
    await newComment.save()
    res.status(200).json({
        success:true,
        message: 'Comment submited...',
        comment: newComment,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const AllCommentofBlog = async (req, res, next) => {
 try {
    const { blogid } = req.params;
    let ownComment = ""
    const allComments = await Comment.find({ blogid }).sort(
      {createdAt: -1}).populate('author', 'name avatar role').lean().exec();
    res.status(200).json({
      allComments,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const DeleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const DeleteComment= await Comment.findOneAndDelete({ _id: id });
    if (!DeleteComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not Delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully..",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const ContComment = async (req, res, next) => {
 try {
    const { blogid } = req.params;
    const Count = await Comment.find({ blogid });
    res.status(200).json({
      Count,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const ShowComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id); // ✅ fixed here
    // console.log(comment);

    if (!comment) {
      return next(errorHandler(404, 'Data not Found')); // add return
    }

    res.status(200).json({ comment });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};


export const UpdateComment = async (req, res, next) => {
  try {
     const { comment } =  req.body;
     const id = req.params.id
  //  console.log(id)
    const updateComment = await Comment.findOneAndUpdate({_id:id},{
      comment
    },{new : true})


    if(!updateComment){
       return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      message:"Comment Updated Successfully..",
      category: updateComment,
    })
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
