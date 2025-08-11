import React, { useState } from "react";
import logo from "../assets/images/logo-white.png";
// import { FaSearch } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { Button } from "./ui/button";
import { Link, Links, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { RouteAddblog, RouteIndex, RouteProfile, RouteSignin } from "@/helper/routes";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usericon from "@/assets/images/user.png";
import { FaRegUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from "@/redux/User/User.slice";
import { showToast } from "@/helper/showToast";
import { getApiBaseUrl } from "@/helper/APIs.js";
import { IoMenu } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import { useSidebar } from "./ui/sidebar";

const Topbar = ({ setIsHidden }) => {
  const { toggleSidebar } = useSidebar()
  const user = useSelector((state) => state.user);
  const [isSearch, setSearch] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async() => {
     try {
          const response = await fetch(`${getApiBaseUrl()}/auth/LogOut`,{
              method: "get",
              credentials: "include",
            });
         
          const data = await response.json();
          if (!response.ok) {
            showToast("error", data.message);
          }
          dispatch(removeUser());
          navigate(RouteIndex);
          showToast("success", data.message);
        } catch (error) {
          showToast("error", error.message);
        }
  }  
    
     const toggleSearch = () => {
      setSearch(!isSearch)
     } 
  
  return (
    <div className="fixed p-2 md:px-5 gap-2  h-16 z-20 bg-white w-full flex justify-between items-center">
      <div className="flex items-center gap-1">
        <button onClick={toggleSidebar} type="button">
         <IoMenu  className='flex md:hidden text-3xl'/>
        </button>
         <Link to={RouteIndex}>  <img width={100} src={logo} alt="" /></Link>
      </div>
      <div className='md:w-[500px] '>
        <div className=
        {`transition-all duration-300 ${
    isSearch ? 'block scale-100' : 'hidden scale-95'
  } md:relative md:block  absolute w-full top-10 md:opacity-100 p-5 md:p-0 md:top-0 left-1`}
  >

        <SearchBox />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button type="button" onClick={toggleSearch} className=" text-2xl flex md:hidden">
          <IoSearchOutline />
        </button>
        {!user.isLoggedIn ? (
          <Button asChild>
            <Link to={RouteSignin} className="rounded-full">
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar >
                  <AvatarImage   src={
                    user?.user?.avatar ? user?.user?.avatar 
                    :  <Loading />    || usericon
                      
                    }
                    referrerPolicy="no-referrer" />
                  {/* <AvatarFallback className='text-violet-400 font-bold shadow-xl bg-white'> {userLogo}</AvatarFallback> */}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuLabel className="text-center text-violet-400 font-bold">
                  <p>
                    {user?.user?.name}
                  </p>
                  <p className="text-ms font-light  text-gray-400">{user?.user?.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link className="flex items-center gap-2" to={RouteProfile}><FaRegUser /> Profile </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link className="flex items-center gap-2" to={RouteAddblog}><FaPlus /> Create Blog </Link>               
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={handleLogout}>
                            
                          <IoLogOutOutline color="red"/>LogOut 
                        
                    </DropdownMenuItem>
                
                </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
