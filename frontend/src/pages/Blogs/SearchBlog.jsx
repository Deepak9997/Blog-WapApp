import BlogCard from '@/components/BlogCard';
import { Card, CardContent } from '@/components/ui/card';
import { getApiBaseUrl } from '@/helper/APIs.js';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { useSearchParams } from 'react-router-dom';


const SearchBlog = () => {
   const [searchParams] = useSearchParams()
   const q = searchParams.get('q');
console.log(q)
   const {
       data: blogdata,
       loading,
       Error,
     } = useFetch(
       `${getApiBaseUrl()}/blog/search?q=${q}`,
       {
         method: "get",
         credentials: "include",
       },[q]
     );
        console.log(blogdata?.blog)
    return (
            <Card className="border-none shadow-none">
            <CardContent className="m-0 p-0 md:px-5">
                <h1 className='text-2xl mb-5 font-bold text-violet-500'>Search Result :-  {q}</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-5'>
                  {blogdata && blogdata.blog.length > 0  ?
                   blogdata.blog.map((blog) => (
                    <div key={blog._id}>
                       <BlogCard props={blog}/>
                    </div>
                   )):(
                     <div className='text-2xl'>Blog Not Found</div>
                    )
                }
                </div>
            </CardContent>
        </Card>
    );
};

export default SearchBlog;
