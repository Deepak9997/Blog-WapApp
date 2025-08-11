import { errorHandler } from "../Helper/errorHandler.js";
import Like from "../model/Likes.model.js";

export const LikesAdd = async (req, res, next) => {
  try {
    const data = req.body;
    const blogid = data?.blogid;
    const author = data?.author;
    const AlreadyLiked = await Like.findOne({ blogid: blogid ,author:author});
    if(AlreadyLiked){
        await Like.findByIdAndDelete(AlreadyLiked._id)
    }
    const Likes = new Like({
      author: data?.author,
      blogid: data?.blogid,
      Like: data?.Like,
    });
    await Likes.save();
    // console.log(Likes)
    res.status(200).json({
      success: true,
      message: "like added seccussfully...",
      likes: Likes,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
export const CountLikes = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const Count = await Like.find({ blogid });
    res.status(200).json({
      Count,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

