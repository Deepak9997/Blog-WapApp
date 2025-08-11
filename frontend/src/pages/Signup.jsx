import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { RouteSignin} from "@/helper/routes.js";
import { data, Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helper/showToast.js";
import GoogleLogin from "@/components/GoogleLogin";
import { getApiBaseUrl } from "@/helper/APIs.js";


const Signup = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    phone: z.string().min(10,'Enter valid phone number'),
    password: z.string().min(8, "password must be at least 8 digits"),
    confirmPassword: z.string(),}).refine((data) => data.password === data.confirmPassword, {message: "Passwords do not match",path: ["confirmPassword"],
  });
      // 1. Define your form.
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          phone: "",
          confirmPassword: "",
        },
      });

    
      // 2. Define a submit handler.
      async function onSubmit(values) {
        try {
          const response = await fetch(`${getApiBaseUrl()}/auth/Register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          // Only show toast and navigate if registration is successful
          const data = await response.json()
          if(!response.ok){
            showToast('error', data.message);
          }
          navigate(RouteSignin)
          showToast('success', data.message);
        } catch (error) {
          showToast('error', error.message);
        }
      }
    
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="p-5 m-2 md:m-0 w-[400px] md:w-[500px]">
        <h1 className="text-2xl font-bold text-center">
          Create Your Account
        </h1>
        <div className=" mb-2">
          <GoogleLogin />
          <div className="relative my-5 border-1 flex justify-center border-gray-200 items-center">
            <span className="absolute bg-white text-gray-400 text-md">Or</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* name */}
            <div className="mb-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* email */}
            <div className="mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter Your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* phone */}
            <div className="mb-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* password */}
            <div className="mb-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input  type="password" placeholder="Enter Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* confirm password */}
            <div className="mb-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* button */}
            <div className="mt-5">
              <Button className="w-full " type="submit">
                Sign Up
              </Button>
              <div className="flex justify-center items-center text-sm gap-2 mt-5">
                <p>Already have Account?</p>
                <Link
                  className="text-blue-500 hover:underline hover:leading-1"
                  to={RouteSignin}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
