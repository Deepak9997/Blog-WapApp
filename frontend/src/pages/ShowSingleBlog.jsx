import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import usericon from "@/assets/images/user.png";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { decode } from "entities";
import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import moment from "moment";
import LikesCount from "@/components/LikesCount";
import { useState } from "react";
import RelatedBlog from "@/components/RelatedBlog";
import { useSelector } from "react-redux";
import { PiSubtitles } from "react-icons/pi";
import { getApiBaseUrl } from "@/helper/APIs.js";

const ShowSingleBlog = () => {
  const { id } = useParams();
  const [Refresh, setRefresh] = useState();
  const user = useSelector((state) => state.user);
  const {
    data: blogdata,
    loading,
    Error,
  } = useFetch(
    `${getApiBaseUrl()}/blog/showblog/${id}`,
    {
      method: "get",
      credentials: "include",
    },
    [Refresh,id]
  );
  // console.log(blogdata?.blog);
  if (loading) return <Loading />;
  return (
    <div className="block xl:flex justify-between gap-5">
      {/* Blog Overview */}
      <div className=" rounded w-full shadow-md xl:w-[100%] ">
        {blogdata && blogdata.blog ? (
          <div className="p-4 md:p-8 xl:p-10">
            {/* {console.log(blogdata.blog.category.slug)} */}
            <h1 className="text-3xl tracking-tighter flex gap-1 font-bold mb-5">
             <PiSubtitles className="text-4xl" /> {blogdata.blog.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="avatar flex items-center gap-5">
                <Avatar className="flex items-center justify-center pt-1">
                  <AvatarImage src={blogdata.blog.author.avatar || usericon} />
                </Avatar>
                <div>
                  <span className="block tracking-tighter leading-4 font-bold text-gray-500">
                    {blogdata.blog.author.name}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {moment(blogdata.blog.createdAt).format("MMMM Do YYYY")}
                  </span>
                </div>
              </div>
              <div className="flex items-center pr-2 md:pr-0 gap-5">
                <CommentCount props={{ blogid: blogdata.blog._id }} />
                {user && user.isLoggedIn ? (
                  <LikesCount props={{ blogid: blogdata.blog._id }} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <img
              className="my-8 rounded w-full max-h-90"
              src={blogdata.blog.filecontent}
              alt=""
            />
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{
                __html: decode(blogdata.blog.content) || "",
              }}
            ></div>
            <div className="border-t pt-4 border-gray-400 mt-10">
              <Comment
                props={{ blogid: blogdata.blog._id, setRefresh: setRefresh }}
              />
            </div>
          </div>
        ) : (
          <h1>Blog Not Found</h1>
        )}
      </div>

      {/* Filter By Category to See Related Post */}
      {blogdata?.blog?.category && (
        <div className="rounded w-full h-fit  overflow-hidden p-4 my-8 md:my-0 shadow-md xl:w-[40%]">
          <RelatedBlog
            props={{
              blogCategoryId: blogdata?.blog?.category._id,
              blogid: blogdata.blog._id,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ShowSingleBlog;
