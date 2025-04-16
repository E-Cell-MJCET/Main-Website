/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';

import logo from "@/public/assets/Logo/logo-big-white.png";
import small_logo from "@/public/assets/Logo/logo-small-white.png";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
    const { user, isSignedIn } = useUser(); // Use Clerk's `useUser` hook
    const router = useRouter();

    // Handle sign-in button click (redirect to sign-in page)
  const handleSignInClick = () => {
    router.push("/sign-in"); // Redirect to sign-in page
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-40 w-full bg-black/40 text-gray-200 shadow-lg backdrop-blur-xl dark:bg-gray-900"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className=" flex w-full items-center justify-between ">
          <Link href="/" className=" font-bold text-blue-500">
            <Image
              src={logo}
              alt="Logo"
              width={140}
              height={60}
              className="hidden object-contain md:flex"
            />
            <Image
              src={small_logo}
              alt="Small Logo"
              width={100}
              height={60}
              className="block size-[48px] object-contain md:hidden"
            />
          </Link>
          {/* Menu Items */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              Events
            </Link>
            <Link
              href="/team"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              Teams
            </Link>
            <Link
              href="/blogs"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              Blogs
            </Link>
            <Link
              href="/aboutus"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              About us
            </Link>
            <Link
              href="/contactus"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              Contact us
            </Link>
            <Link
              href="/membership"
              className="font-bold text-gray-200 hover:text-blue-500 dark:text-gray-300"
            >
              Become a Member
            </Link>
            <Link href={isSignedIn ? '#' : "/sign-in"} onClick={isSignedIn ? undefined : handleSignInClick}>
              {isSignedIn ? (
                <UserButton />
                ) : (
                  <SignInButton />
                )}
            </Link>
          </div>
        </div>
        <div className="mr-5 w-full text-right transition duration-300 ease-in-out lg:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="flex flex-row items-center space-x-5">
                <div className="flex flex-col items-center transition-all duration-100 ease-in">
                  <div className="flex flex-col items-center transition-all">
                    <div className="my-[2.5px] h-[4px] w-[22px] rounded-lg bg-white transition-all duration-150 ease-out dark:bg-white"></div>
                    <div className="my-[2.5px] h-[4px] w-[34px] rounded-lg bg-white transition-all duration-150 ease-out dark:bg-white"></div>
                    <div className="my-[2.5px] h-[4px] w-[22px] rounded-lg bg-white transition-all duration-150 ease-out dark:bg-white"></div>
                  </div>
                </div>
                {/* SignIn or User Button */}
                <Link href={isSignedIn ? '#' : "/sign-in"} onClick={isSignedIn ? undefined : handleSignInClick}>
                  <span className="font-orbitron py-1 text-lg text-white hover:text-purple-500 md:text-3xl">
                    {isSignedIn ? (
                      <UserButton />
        ) : (
          <SignInButton />
        )}
                  </span> 
                </Link>
              </div>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-10 ">
                <ul>
                  <li className="mx-3 my-5 from-[#eb3c3b] via-[#525e8e] to-[#2c6ca4] text-xl font-semibold text-black hover:bg-gradient-to-r hover:bg-clip-text hover:font-bold hover:text-transparent hover:underline dark:text-white">
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li className="mx-3 my-5 from-[#eb3c3b] via-[#525e8e] to-[#2c6ca4] text-xl font-semibold text-black hover:bg-gradient-to-r hover:bg-clip-text hover:font-bold hover:text-transparent hover:underline dark:text-white">
                    <Link href={"/events"}>Events</Link>
                  </li>
                  <li className="mx-3 my-5 from-[#eb3c3b] via-[#525e8e] to-[#2c6ca4] text-xl font-semibold text-black hover:bg-gradient-to-r hover:bg-clip-text hover:font-bold hover:text-transparent hover:underline dark:text-white">
                    <Link href={"/team"}>Team</Link>
                  </li>
                  <li className="mx-3 my-5 from-[#eb3c3b] via-[#525e8e] to-[#2c6ca4] text-xl font-semibold text-black hover:bg-gradient-to-r hover:bg-clip-text hover:font-bold hover:text-transparent hover:underline dark:text-white">
                    <Link href={"/blogs"}>Blogs</Link>
                  </li>
                  <li className="mx-3 my-5 from-[#eb3c3b] via-[#525e8e] to-[#2c6ca4] text-xl font-semibold text-black hover:bg-gradient-to-r hover:bg-clip-text hover:font-bold hover:text-transparent hover:underline dark:text-white">
                    <Link href={"/contactus"}>Contact</Link>
                  </li>
                  <li className="mx-3 my-5 from-[#eb3c3b] via-[#525e8e] to-[#2c6ca4] text-xl font-semibold text-black hover:bg-gradient-to-r hover:bg-clip-text hover:font-bold hover:text-transparent hover:underline dark:text-white">
                    <Link href={"/membership"}>Become a Member</Link>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
