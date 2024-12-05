import Image from "next/image";
import React from "react";
import { IoShareOutline } from "react-icons/io5";
import { toast } from "sonner";

import rukhaiya from "@/public/assets/Team/Execom/Editorial/Rukhaiya/RukhaiyaBlog.jpg";

const BlogIntro = ({
  title,
  date,
  author,
  time,
}: {
  title: string;
  date: string;
  author: string;
  time: string;
}) => {
  const handleShare = () => {
    // Get the link and copy it to clipboard
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast("Copied link to clipboard.");
  };

  return (
    <div className="my-5 text-left">
      <h1 className="font-playfair text-4xl">{title}</h1>
      <div className="flex flex-row justify-between">
        <div className=" flex items-center pt-3">
          <div>
            <div className="flex flex-row ">
              <Image
                src={rukhaiya}
                alt="Rukhaiya"
                width={300}
                height={300}
                className="size-12 rounded-full object-fill"
              />
              <div className="ml-3 flex flex-col">
                <span className=" block text-gray-900 underline">{author}</span>
                <div className="flex flex-row">
                  {" "}
                  <span className="block text-sm text-gray-400">{date}</span>
                  <span className="mx-2 block text-sm text-gray-400"> - </span>
                  <span className="block text-sm text-gray-400">
                    {time} read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex cursor-pointer items-center pt-5"
          onClick={handleShare}
        >
          <IoShareOutline className="text-2xl" />
          <span className="pl-2 text-gray-900">Share</span>
        </div>
      </div>
    </div>
  );
};

export default BlogIntro;
