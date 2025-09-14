import React, { useState } from "react";
import { FaShare } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { FaClipboardList } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const ShareBlog = ({ url, title, share, setShare }) => {
   const [copied, setCopied] = useState(false);

  const CopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // hide after 2s
    });
  };


  return (
   <div className="flex flex-col gap-5 absolute top-[50px] md:top-[80px] left-0  md:left-[10%] w-[100%] md:w-[80%] shadow-xl rounded-lg bg-gray-200 md:bg-gray-100/70 p-10">
    <h1 className="text-3xl font-bold mb-8 flex gap-3 text-violet-900"><FaShare className="text-4xl"/> Share</h1>
    <RxCross1 onClick={()=>{setShare(!share)}} className="absolute top-11 right-10 text-3xl hover:text-red-700" />
    <div className="flex flex-wrap gap-3 mb-8">
      {/* WhatsApp */}
      <Link
        to={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 w-22 rounded-lg flex flex-col items-center bg-green-400 text-white gap-2"
      >
       <BsWhatsapp color="white" className="text-2xl"/> WhatsApp
      </Link>

      {/* Twitter */}
      <Link
        to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 w-22 rounded-lg flex flex-col items-center bg-blue-400  text-white gap-2"
      >
       <BsTwitter className="text-2xl"/> Twitter
      </Link>

      {/* Facebook */}
      <Link
        to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        
        className="px-3 py-2 w-22  rounded-lg flex flex-col items-center bg-blue-700  text-white gap-2"
      >
       <FaFacebook className="text-2xl"/> Facebook
      </Link>
    </div>
    <div className="flex w-full relative mb-3">
        <Input value={url} className=" overflow-hidden  px-3 bg-white" placeholder="heyxcdcsdcsacascdcvdc dcdwced"  type="text"/>
        <button readOnly onClick={CopyLink} className="rounded-r-md absolute bg-gray-200/50 top-0 right-0 px-3 py-2 text-xl "><FaClipboardList /></button>
        {copied && (
            <span className="absolute -bottom-6 right-0 text-black text-sm">
              Copied!
            </span>
        )}
    </div>
   </div>
  );
};

export default ShareBlog;
