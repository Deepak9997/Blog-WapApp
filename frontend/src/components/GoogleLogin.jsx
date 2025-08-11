import React, { use } from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helper/firebase";
import { showToast } from "@/helper/showToast";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helper/routes";
import { setUser } from "@/redux/User/User.slice";
import { useDispatch } from "react-redux";
import { getApiBaseUrl } from "@/helper/APIs.js";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const values = {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        phone: user.phoneNumber,
      };
      const response = await fetch(
        `${getApiBaseUrl()}/auth/googleLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      // Only show toast and navigate if registration is successful
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      Navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <Button className="  w-full" variant={"outline"} onClick={handleLogin}>
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
