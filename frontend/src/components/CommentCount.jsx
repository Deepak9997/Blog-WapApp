import { ComCount } from "@/helper/ComCount.js";
import { getApiBaseUrl } from "@/helper/APIs.js";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";

const CommentCount = ({ props }) => {
  const user = useSelector((state) => state.user);
  const userid = user?.user?._id;
  const blogid = props.blogid;
  const [Count, setCount] = useState();
  const [Refresh,setRefresh] = useState("");
  const {
    data: CountData,
    loading,
    error,
  } = useFetch(
    `${getApiBaseUrl()}/comment/count/${blogid}`,
    {
      method: "get",
      credentials: "include",
    },
    [Refresh]
  );
  //    console.log(CountData?.Count.length)

  useEffect(() => {
    const interval = setInterval(() => {
      if (CountData && CountData?.Count) {
        const result = ComCount(CountData?.Count.length);
         setCount(result);
         setRefresh(!Refresh)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [CountData, userid]);
  return (
    <div className="flex items-center gap-1">
      <FaRegCommentDots className=" text-2xl text-green-500" />
      <span className=" text-green-500 text-sm font-bold">
        {Count}
      </span>
    
    </div>
  );
};

export default CommentCount;
