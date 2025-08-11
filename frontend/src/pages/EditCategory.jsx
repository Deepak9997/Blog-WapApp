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
import { useFetch } from "@/hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { RouteCategory } from "@/helper/routes";
import { getApiBaseUrl } from "@/helper/APIs.js";


const EditCategory = () => {
  const Navigate = useNavigate()
  const [slug, setSlug] = useState();
  const { category_id } = useParams()
//    console.log(category_id)
  const {
      data: Categorydata,
      loading,
      Error,
    } = useFetch(`${getApiBaseUrl()}/category/show/${category_id}`, {
      method: "get",
      credentials: "include",
    },[category_id]);

    console.log(Categorydata)

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


    useEffect(()=>{
    if(Categorydata) {
        form.setValue('name', Categorydata?.category?.name)
        form.setValue('slug', Categorydata?.category?.slug)
    }
  },[Categorydata])
  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
        const response = await fetch(
          `${getApiBaseUrl()}/category/update/${category_id}`,
          {
            method: "put",
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify(values),
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
    <div className="">
      {}
      <Card className="border-none mx-auto m-2 shadow-sm p-4">
        <h1 className="mb-4 font-bold px-6 text-violet-500 text-3xl">Edit Category</h1>
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
    </div>
  );
};

export default EditCategory;
