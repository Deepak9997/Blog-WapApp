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
import { getApiBaseUrl } from '../helper/APIs.js';
import { RouteCategory } from "@/helper/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddCategory = () => {
  const Navigate = useNavigate();
  const [slug, setSlug] = useState();
  const user = useSelector(state => state.user)
  const userid = user?.user?._id
  const formSchema = z.object({
    name: z.string().min(3, "name must be at least 3 char"),
    slug: z.string().min(3, "slug must be at least 3 char"),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const Categoryname = form.watch("name");
  useEffect(() => {
    if(Categoryname){
        const Slug = slugify(Categoryname, { lower: true });
        form.setValue('slug', Slug)
        setSlug(Slug);
    }
  },[Categoryname]);


  async function onSubmit(values) {
    try {
      const newValues = {...values,author:userid}
        const response = await fetch(
          `${getApiBaseUrl()}/category/add`,
          {
            method: "POST",
            credentials: 'include',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify(newValues),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          showToast("error", data.message);
        }
        form.reset()
        Navigate(RouteCategory)
        showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }


  return (

      <Card className="border-none mx-auto m-2 shadow-sm p-4">
         <h1 className="mb-4 font-bold px-6 text-violet-500 text-3xl">Add Category</h1>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
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

export default AddCategory;
