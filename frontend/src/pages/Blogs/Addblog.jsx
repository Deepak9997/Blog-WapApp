import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Card, CardContent } from "@/components/ui/card";
import { showToast } from "@/helper/showToast";
import { getApiBaseUrl } from '@/helper/APIs.js';
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import { Textarea } from "@/components/ui/textarea";
import Editor from '@/components/Editor'
import { useNavigate } from "react-router-dom";
import { Routeblog } from "@/helper/routes";

const Addblog = () => {
  const [filePriview, setPriview] = useState();
  const [file, setFile] = useState();
  const Navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const [Slug, setSlug] = useState();

  const {
    data: Categorydata,
    loading,
    Error,
  } = useFetch(`${getApiBaseUrl()}/category/allcategory`, {
    method: "get",
    credentials: "include",
  });
  // console.log(Categorydata)


  const formSchema = z.object({
    author: z.string(),
    category: z.string(),
    title: z.string().min(3, "title must be at least 3 char"),
    slug: z.string().min(3, "slug must be at least 3 char"),
    filecontent: z.string(),
    content: z.string().min(3, "Content must be at least 3 char"),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      category: "",
      title: "",
      slug: "",
      filecontent: "",
      content: "",
    },
  });

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    if(data){
        form.setValue('content', data)
    }
}

  const blogtitle = form.watch("title");
  useEffect(() => {
    if (blogtitle) {
      const Slug = slugify(blogtitle, { lower: true });
      form.setValue("slug", Slug);
      setSlug(Slug);
    }
  }, [blogtitle]);





  // 2. Define a submit handler.

  async function onSubmit(values) {
    try {
      const newValues = {...values, author: user?.user?._id}
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(newValues));
      console.log(newValues)
      const response = await fetch(`${getApiBaseUrl()}/blog/add`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      form.reset({
        author: "",
        category: "",
        title: "",
        slug: "",
        filecontent: "",
        content: "",
      });
      Navigate(Routeblog)
      setFile();
      setPriview();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }


  const handleuploadFile = (files) => {
    const file = files[0];
    const priview = URL.createObjectURL(file);
    setFile(file);
    setPriview(priview);
  };

  return (
    
      <Card className="border-none mx-auto m-2 shadow-sm">
        <CardContent>
           <h1 className="mb-4 font-bold text-violet-500 text-3xl">AddBlog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Categorydata &&
                            Categorydata.category.length > 0 ? (
                              Categorydata?.category.map((category) => (
                                 <SelectItem key={category?._id} value={category?._id}>{category?.name}</SelectItem>
                              ))
                            ) : (
                               <SelectItem value="other">other</SelectItem>
                            )}
                           
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder=" Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="filecontent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <FormControl>
                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            handleuploadFile(acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div className="relative w-50 h-34 border-2 border-dashed border-gray-500 p-2 m-2 flex items-center justify-center ">
                                <h1 className="text-gray-400 z-4 absolute text-3xl font-extralight">+</h1>
                                <img className="w-full h-full z-10" src={filePriview} alt="" />
                              </div>
                            </div>
                          )}
                        </Dropzone>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                 <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="Title" {...field} /> */}
                        <Editor key={field.value} props={{initialdata: field.value ,onChange: handleEditorData}} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button className="w-full " type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
};

export default Addblog;
