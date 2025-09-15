import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { RouteBlogByCategory, RouteCategory, RouteUsers } from "@/helper/routes";
import { getApiBaseUrl } from "@/helper/APIs.js";
import { useState } from "react";

export function AppSidebar() {
  const user = useSelector((state) => state.user);
  const {
    data: Categorydata,
    loading,
    Error,
  } = useFetch(`${getApiBaseUrl()}/category/allcategorydata`, {
    method: "get",
    credentials: "include",
  });
  const [active, setActive] = useState(null);

  return (
    <div className="w-0 md:w-40">
      <Sidebar
        className={`fixed border-none z-30 md:static top-0 left-0  bg-white transition-transform duration-30  ease-in-out md:translate-x-0 md:w-[200px] w-[220px]`}
      >
        <SidebarHeader className="bg-white">
          <img src={logo} alt="" width={100} />
        </SidebarHeader>
        <SidebarContent className="bg-white scrollbar mt-2">
          <SidebarGroup>
            <SidebarMenu>
              {/* home */}
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:text-violet-500">
                  <Link
                    to="/"
                    className={active === "home" ? "flex  gap-2 items-center text-violet-500" : "flex  gap-2 items-center text-gray-700"}
                    onClick={() => setActive("home")}
                  >
                  <IoHomeOutline />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Blogs */}
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:text-violet-500">
                  <GrBlog />
                  <Link
                    to="/Blogs"
                    className={active === "blogs" ? "flex  gap-2 items-center text-violet-500" : "flex  gap-2 items-center text-gray-700"}
                    onClick={() => setActive("blogs")}
                  >
                    Blogs
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Comments */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton className="hover:text-violet-500">
                  <FaRegComment />
                  <Link to="/Comments"> Comments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* Cotegory */}

                
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:text-violet-500">
                      <TbCategory />
                      <Link
                        to={RouteCategory}
                        className={active === "category" ? "flex  gap-2 items-center text-violet-500" : "flex  gap-2 items-center text-gray-700"}
                        onClick={() => setActive("category")}
                      >
                        Category
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

              {user && user?.user?.role && user?.user?.role === "Admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:text-violet-500">
                    <FaRegUser />
                    <Link
                      to={RouteUsers}
                      className={active === "user" ? "flex  gap-2 items-center text-violet-500" : "flex  gap-2 items-center text-gray-700"}
                      onClick={() => setActive("user")}
                    >
                      User
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
                
            </SidebarMenu>
          </SidebarGroup>

          {/* Categories */}
          <SidebarGroup className="mb-10">
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              {Categorydata?.category.map((category) => (
                <SidebarMenuItem key={category?._id}>
                  <SidebarMenuButton className="hover:text-violet-500">
                    <Link
                      key={category?._id}
                      to={RouteBlogByCategory(category._id)}
                      className={active === category._id ? "text-violet-500" : "text-gray-700"}
                      onClick={() => setActive(category._id)}
                    >
                      <span># </span> {category?.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
}
