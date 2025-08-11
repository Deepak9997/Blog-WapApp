import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getApiBaseUrl } from '@/helper/APIs.js';
import { useFetch } from "@/hooks/useFetch";
import BlogCard from "@/components/BlogCard";
import { Card, CardContent } from "@/components/ui/card";
// import SearchBox from "@/components/SearchBox"; // custom search input
import { BiSolidCategory } from "react-icons/bi";


const BlogByCategory = () => {
  const { category_id } = useParams();

  const {
    data: blogdata,
    loading,
    Error,
  } = useFetch(
    `${getApiBaseUrl()}/blog/blogbycategory/${category_id}`,
    {
      method: "get",
      credentials: "include",
    },
  [category_id]
  );
  return (
    <Card className="border-none shadow-none">
      <CardContent className="m-0 p-0 md:px-5">
        <div className="mb-4 font-bold text-2xl pb-5 border-b text-violet-700 flex items-center gap-2">
             <BiSolidCategory />
             <h3>{blogdata?.categoryData?.name}</h3>
           {/* <SearchBox onSearch={(value) => setSearchTerm(value)} /> */}
         </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-5">
          {blogdata && blogdata.blog.length > 0 ? (
            blogdata.blog.map((blog) => (
              <div key={blog._id}>
                <BlogCard key={blog._id} props={blog} />
              </div>
            ))
          ) : (
            <div className="text-2xl">Blog Not Found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default BlogByCategory;
