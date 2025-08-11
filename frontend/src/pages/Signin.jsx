import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { RouteIndex, RouteSignin, RouteSignup } from "@/helper/routes";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helper/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/User/User.slice";
import GoogleLogin from "@/components/GoogleLogin";
import { getApiBaseUrl } from "@/helper/APIs.js";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 digits"),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
 async function onSubmit(values) {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/auth/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      showToast(data.message, "error"); // ❌ Login failed, show error
      return; // Stop execution, don't navigate
    }

    dispatch(setUser(data.user));
    showToast("success",data.message);
    navigate(RouteIndex); // ✅ Successful login — go to home
  } catch (error) {
    showToast( "error",error.message);
  }
}


  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="p-5 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-5">
          Login Into Account
        </h1>
        <div className=" mb-2">
          <GoogleLogin />
          <div className="relative my-5 border-1 flex justify-center border-gray-200 items-center">
            <span className="absolute bg-white text-gray-400 text-md">Or</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button className="w-full " type="submit">
                Sign In
              </Button>
              <div className="flex justify-center items-center text-sm gap-2 mt-5">
                <p>Don't have Account?</p>
                <Link
                  className="text-blue-500 hover:underline hover:leading-1"
                  to={RouteSignup}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
