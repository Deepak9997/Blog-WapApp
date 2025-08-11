import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "@/helper/showToast";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/User/User.slice";
import usericon from "@/assets/images/user.png"
import { getApiBaseUrl } from "@/helper/APIs.js";
const Profile = () => {
  const [avatarPriview, setPriview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);


  const {
    data: userData,loading,error,} = useFetch(`${getApiBaseUrl()}/user/getuser/${user?.user?._id}`, {
    method: "get",
    credentials: "include",
  }) || { data, loading, error };

  // console.log(userData);
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email(),
    bio: z.string(),
    password: z.string(),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success ) {
      form.reset({
        name: userData?.user?.name,
        email: userData?.user?.email,
        bio: userData?.user?.bio,
      });
    }
  }, [userData]);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      if (!userData) {
        showToast("error", "User data is not loaded. Please try again later.");
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(values));

      const response = await fetch(`${getApiBaseUrl()}/user/updateUser/${userData?.user?._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
    // console.log(values)
  }

  const handleuploadFile = (files) => {
      const file = files[0];
      const priview = URL.createObjectURL(file)
      setFile(file)
      setPriview(priview)
  }

  if(loading) return <Loading />
  return (
    <div>
      <Card className=" w-full border-none relative mx-auto">  
        <CardContent>
          <div className="flex  justify-center items-center mt-10">
            <Dropzone onDrop={(acceptedFiles) => handleuploadFile(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-28 h-28  border-2 relative border-violet-200 group">
                    <AvatarImage
                      src={
                         avatarPriview ? avatarPriview :
                         userData?.user?.avatar || 
                        usericon 
                      }
                      referrerPolicy="no-referrer"
                    />
                    {/* <AvatarFallback className='text-violet-400 font-bold shadow-xl bg-white'> {userLogo}</AvatarFallback> */}
                    <div className="absolute z-10 bottom-0 right-0 w-full h-full items-center justify-center bg-[rgba(0,0,0,0.4)] group-hover:flex  hidden cursor-pointer">
                      <FaCamera
                        color="blue"
                        className="bg-[rgba(255,255,255,0.5)]  w-6 h-6 p-1 rounded  "
                      />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-4"
              >
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea  placeholder="Enter Bio" {...field}/>
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
                <Button className="w-full " type="submit" >
                  Save changes
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
