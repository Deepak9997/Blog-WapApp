import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import usericon from "@/assets/images/user.png";
import { Badge } from "@/components/ui/badge";
import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteShowSingleBlog } from "@/helper/routes";
import { decode } from "entities";

const BlogCard = ({ props }) => {
  const getFirstWords = (text, from, to) => {
    const decoded = decode(text || "");
    const words = decoded.split(/\s+/);
    return words.slice(from, to).join(" ");

    
  };
  return (
    <Link key={props._id} to={RouteShowSingleBlog(props._id)}>
      <div key={props._id} className="p-4 shadow-md rounded">
        <div className="flex items-center justify-between">
          <div className="avatar flex items-center">
            <Avatar className="flex items-center justify-center pt-1">
              <AvatarImage src={props.author.avatar || usericon} />
            </Avatar>
            <span className="mx-2 tracking-tighter5">
              {props?.author?.name}
            </span>
          </div>
          <div className="relative flex items-center">
            {props.author && props.author.role === "Admin" ? (
              <Badge
                className="bg-violet-500 absolute right-1 text-white"
                variant="outline"
              >
                Admin
              </Badge>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="overflow-hidden w-full h-70 md:h-50 group my-3">
          <img
            src={props.filecontent}
            className=" rounded w-full h-70 md:h-50 object-fit"
            alt=""
          />
        </div>
        <div className="flex text-sm items-center gap-2">
          <FaRegCalendarAlt />
          <span>{moment(props.createdAt).format("MMMM Do YYYY")}</span>
        </div>
        <h4 className="text-md tracking-tighter font-bold">{props.title}</h4>
{/*         <p className="text-sm ">{getFirstWords(decode(props.content), 0, 5)}</p> */}
      </div>
    </Link>
  );
};

export default BlogCard;
