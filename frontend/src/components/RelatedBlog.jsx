import React from "react";
import { useFetch } from "@/hooks/useFetch.js";
import { getApiBaseUrl } from "@/helper/APIs.js";
import { Link } from "react-router-dom";
import { RouteShowSingleBlog } from "@/helper/routes.js";

const RelatedBlog = ({ props }) => {
  const blogCategoryId = props?.blogCategoryId;
  const {
    data: blogdata,
    loading,
    Error,
  } = useFetch(
    `${getApiBaseUrl()}/blog/relatedblog/${blogCategoryId}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  // console.log(blogdata?.blog);

  return (
    <div>
      <h1 className="text-3xl mb-4 font-bold">Related Blogs</h1>
      {blogdata &&
        blogdata?.blog.length > 0 &&
        blogdata?.blog.map((blog) => {
          if (blog._id === props?.blogid) return null;
          return (
            <Link key={blog._id} to={RouteShowSingleBlog(blog?._id)}>
              <div
                key={blog?._id}
                className="px-2 flex gap-2 items-center shadow-md rounded"
              >
                <div className="overflow-hidden w-full max-w-20 flex xl:max-h-30 group my-3">
                  <img
                    src={blog?.filecontent}
                    className="rounded w-full xl:w-100"
                    alt="image"
                  />
                </div>

                <h4 className="text-md tracking-tight leading-4 font-bold">
                  {blog?.title}  
                </h4>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default RelatedBlog;
