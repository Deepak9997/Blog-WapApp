import { getApiBaseUrl } from "@/helper/APIs.js";
import { showToast } from "@/helper/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";

const LikesCount = ({ props }) => {
  const user = useSelector((state) => state.user);
  const userid = user?.user?._id;
  // console.log(userid)
  const blogid = props.blogid;

  const [Likes, setLikes] = useState(false); // true = liked
  const [LikeCount, setLikeCount] = useState(0); // Total count

  // Fetch existing like data from DB
  const { data: LikesData } = useFetch(
    `${getApiBaseUrl()}/likes/count/${blogid}`,
    { method: "get", credentials: "include" },
    [blogid]
  );

  // On load, extract if user liked + total count
  useEffect(() => {
    if (LikesData && LikesData.Count) {
      const total = LikesData.Count.length;
      // console.log(LikesData.Count)
      setLikeCount(total);
      const userLike = LikesData.Count.find((c) => c.author === userid);
      const userl = parseInt(userLike?.Like)
      // (userLike?.author === userid)
      if(userl === 1){
        setLikeCount(total);
        // console.log(userl)
        setLikes(true)
      }else if (userl === 0){
      setLikeCount(total - 1);
      setLikes(false);
      }
    }
  }, [LikesData, userid,]);

  const toggleValue = async () => {
    const newLikeStatus = !Likes;
    setLikes(newLikeStatus); // Toggle UI
    setLikeCount((prev) => prev + (newLikeStatus ? 1 : -1)); // Update count UI

    const payload = {
      Like: newLikeStatus ? 1 : 0,
      blogid,
      author: userid,
    };

    try {
      const response = await fetch(
        `${getApiBaseUrl()}/likes/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      }
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <FaHeart
        onClick={toggleValue}
        className={`text-2xl cursor-pointer  ${
          Likes ? "text-red-500 " : "text-gray-300"
        }`}
      />
      <span className="text-sm text-red-500 font-bold select-none">
        {LikeCount}
      </span>
    </div>
  );
};

export default LikesCount;
