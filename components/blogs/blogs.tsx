"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const data = [
  {
    title: "Overcoming Failure in Entrepreneurship",
    description:
      "Entrepreneurship is often glamorized in media and culture as a fast track to wealth...",
    image: "/assets/blogs/ofe.jpg",
    author: "Rukhaiya Begum",
    link: "./ofe",
  },
  {
    title: "How to Build a Strong Brand for Your Startup",
    description:
      "In today’s competitive business environment, building a strong brand is essential...",
    image: "/assets/blogs/sbs.jpg",
    author: "Rukhaiya Begum",
    link: "./sbs",
  },
  {
    title: "The Role of Innovation in Entrepreneurship",
    description:
      "Entrepreneurship is often described as the art of identifying opportunities,...",
    image: "/assets/blogs/tre/title.png",
    author: "Rukhaiya Begum",
    link: "./tre",
  },
  {
    title: "How to Validate a Business Idea Before Starting",
    description:
      "Starting a new business is an exciting venture, but it comes with significant risks....",
    image: "/assets/blogs/vbi.jpg",
    author: "Rukhaiya Begum",
    link: "./vbi",
  },
];

const Blogs = () => {
  const textRef = useRef(null);
  const handleMouseEnter2 = (e: any) => {
    const letter = e.target;
    gsap.to(letter, {
      y: -20,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave2 = (e: any) => {
    const letter = e.target;
    gsap.to(letter, {
      y: 0,
      duration: 0.3,
      ease: "bounce.out",
    });
  };

  return (
    <div className="z-30 flex w-screen flex-col items-center justify-start pb-10 pt-32">
      <p
        ref={textRef}
        className="my-5 font-doto text-3xl font-extrabold  hover:cursor-none md:text-7xl"
        style={{ display: "flex", gap: "0.1em" }}
      >
        {"Blog with Ecell".split("").map((char, index) => (
          <span
            key={index}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <div className="flex w-full flex-wrap justify-center gap-6">
        {data.map((blog, index) => (
          <div
            key={index}
            className="flex w-full max-w-sm flex-col items-center rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={blog.image}
              alt="Blog Image"
              width={100}
              height={100}
              className="h-64 w-full rounded-md object-cover"
            />
            <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
              {blog.title}
            </h2>
            <p className="mt-2 text-center text-gray-600">{blog.description}</p>
            <p className="mt-4 text-sm text-gray-500">By: {blog.author}</p>
            <Link
              href={`/blogs/${blog.link}`}
              className="mt-4 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
