import React, { useState } from "react";
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
import { getApiBaseUrl } from "@/helper/APIs.js";
import { showToast } from "@/helper/showToast";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { RouteSignin } from "@/helper/routes";
import { Link } from "react-router-dom";
import ShowComments from "@/pages/Comment/ShowComments";

const Comment = ({ props }) => {
  const [Refresh, setRefresh] = useState(false);
  const user = useSelector((state) => state.user);
  const blogid = props?.blogid;

  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const NewValue = {
        ...values,
        blogid: props.blogid,
        author: user.user._id,
      };
      const response = await fetch(
        `${getApiBaseUrl()}/comment/add`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(NewValue),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      }
      form.reset();
      setRefresh(!Refresh);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <h1 className="flex mb-2 text-3xl gap-3 items-center">
        <FaRegComments className="text-violet-500" /> Comments
      </h1>
      {user && user.isLoggedIn ? (
        <>
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
          <div className="mt-10">
            <ShowComments  key={Refresh} blogid={blogid} Refresh={Refresh} setRefresh={setRefresh}  />
          </div>
        </>
      ) : (
        <Button asChild>
          <Link to={RouteSignin}>Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default Comment;