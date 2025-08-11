import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { showToast } from "@/helper/showToast";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { RouteShowSingleBlog } from "@/helper/routes";
import { getApiBaseUrl } from '@/helper/APIs.js';

const EditComment = () => {
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const blogid = searchParams.get("blog");
    const [Refresh,setRefresh] = useState();
    const Navigate = useNavigate();
    const {
        data: commentData,
        loading,
        error,
      } = useFetch(
        `${getApiBaseUrl()}/comment/editcomment/${id}`,
        {
          method: "get",
          credentials: "include",
        },
        [id]
      );
    //   console.log(commentData)

    const formSchema = z.object({
    comment: z.string().min(3, "name must be at least 3 char"),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
   async function onSubmit(values) {
       try {
         
         const response = await fetch(
           `${getApiBaseUrl()}/comment/update/${id}`,
           {
             method: "put",
             headers: { "Content-type": "application/json" },
             body: JSON.stringify(values),
           }
         );
         const data = await response.json();
         if (!response.ok) {
           showToast("error", data.message);
         }
         Navigate(RouteShowSingleBlog(blogid))
         setRefresh(!Refresh);
         showToast("success", data.message);
       } catch (error) {
         showToast("error", error.message);
       }
     }

     useEffect(() => {
         if(commentData){
             form.setValue('comment', commentData?.comment?.comment)
         }
       },[commentData]);
  return (
    <div>
      <Card className='border-none'>
        <CardHeader>
          <h1 className="text-2xl font-bold mb-5">EditComment</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write Your Comment...."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditComment;
