"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/Logo/logo-big-colour.png";

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-40 bg-black text-gray-200 dark:bg-gray-900 shadow-lg"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-500">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* Menu Items */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-200 dark:text-gray-300 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-200 dark:text-gray-300 hover:text-blue-500"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-200 dark:text-gray-300 hover:text-blue-500"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-200 dark:text-gray-300 hover:text-blue-500"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        {/* <Link
          href="/signup"
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Sign Up
        </Link> */}
      </nav>
    </motion.header>
  );
};

export default Navbar;
