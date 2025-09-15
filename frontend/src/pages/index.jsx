
import React from 'react';
import BlogCard from '@/components/BlogCard'
import { Card, CardContent } from '@/components/ui/card';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/components/Loading';
import { getApiBaseUrl } from '../helper/APIs.js';

const index = () => {

   console.log("env",getApiBaseUrl())

    const {
        data: blogdata,
        loading,
        Error,
      } = useFetch(`${getApiBaseUrl()}/blog/allblog`, {
        method: "get",
        credentials: "include",
      });
      // console.log(blogdata)
      if(loading) return <Loading />
    return (
        <Card className="border-none mx-auto m-2 shadow-none">
            <CardContent className="m-0 p-0 md:px-5">
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

export default index;
