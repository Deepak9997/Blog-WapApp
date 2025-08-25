import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { AvatarImage } from "@radix-ui/react-avatar";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import usericon from "@/assets/images/user.png";
import HandleDelete from "@/helper/HandleDelete";
import { showToast } from "@/helper/showToast";
import { RouteEditComment } from "@/helper/routes";
import { getApiBaseUrl } from '@/helper/APIs.js';

const ShowComments = ({ blogid, Refresh, setRefresh }) => {
  const user = useSelector((state) => state.user);
  const userid = user?.user?._id;
  const {
    data: BlogcommentData,
    loading,
    error,
  } = useFetch(
    `${getApiBaseUrl()}/comment/allcommentofblog/${blogid}`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  useEffect(() => {
      const interval = setInterval(() => {
      if (BlogcommentData && BlogcommentData?.allComments) {
      const total = BlogcommentData?.allComments?.length;
      // console.log(total)
      
    }
    }, 1000);
     return () => clearInterval(interval);
  }, [BlogcommentData, userid]);

  const handleDelete = async (id) => {
    const response = HandleDelete(
      `${getApiBaseUrl()}/comment/delete/${id}`
    );
    if (response) {
      setRefresh(!Refresh);
      showToast("success", response.message);
    } else {
      showToast("error", response.message);
    }
  };
  return (
    <div>
      {BlogcommentData && BlogcommentData?.allComments.length > 0
        ? BlogcommentData?.allComments.map((comment) => (
            <div
              key={comment?._id}
              className="block border rounded-md relative border-gray-400 bg-gray-100 p-2 items-center mt-2 "
            >
              {/* {console.log(comment?._id)} */}
              <div className="avatar flex items-center">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={comment?.author?.avatar || usericon} />
                </Avatar>
                <span className="mx-2 tracking-tighter text-sm font-medium text-gray-500">
                  {comment?.author?.name}
                </span>
              </div>
              { comment?.author?._id === user?.user?._id ? (
                <div className="Edit/delete absolute flex right-1 top-1  items-center gap-1">
                  <Button
                    className="bg-transparent w-7 h-7  border-none hover:text-violet-800"
                    variant="outline"
                    asChild
                  >
                    <Link key={comment?._id} to={RouteEditComment(comment?._id, blogid)}>
                      <FaRegEdit />
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(comment?._id);
                    }}
                    className=" w-7 h-7 bg-transparent hover:text-red-700 border-none"
                    variant="outline"
                  >
                    <FaTrash />
                  </Button>
                </div>
              ) : (
                ""
              )}

              <div className="flex  justify-between text-sm p-1">
                {comment.comment}
                <span>{moment(comment.createdAt).format("MMMM Do YYYY")}</span>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ShowComments;
