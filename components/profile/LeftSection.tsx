// LeftSection.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import Link from "next/link";

import { UserType } from "@/types/UserTypes";

const LeftSection = ({ user }: { user: UserType }) => {
  console.log("left section user data ", user);

  console.log("image url: ", user.image);

  return (
    <motion.div
      className="col-span-1 h-fit rounded-xl bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-4 size-32">
          <Image
            src={user.image}
            alt="Profile Picture"
            width={200}
            height={200}
            className="size-40 rounded-full border-4 border-[#8e2ea3] object-cover"
          />
        </div>
        {/* Static Profile Name */}
        <h1 className="text-2xl font-semibold text-gray-100">{user.name}</h1>
        <h2 className="text-lg text-gray-300">{user.position}</h2>
        <div className="mt-2 flex space-x-2">
          <span className="rounded-full bg-[#8e2ea3] px-3 py-1 text-xs text-white">
            {user.portfolio}
          </span>
        </div>
        {/* Social Media Links */}
        <div className="mt-4 w-full space-y-4">
          <div className="flex justify-center gap-4">
            {user.social.github && (
              <Link
                href={user.social.github}
                target="_blank"
                className="text-[#fe019a] hover:text-indigo-400"
              >
                <FaGithub size={24} />
              </Link>
            )}
            {user.social.linkedin && (
              <Link
                href={user.social.linkedin}
                target="_blank"
                className="text-[#8e2ea3] hover:text-indigo-400"
              >
                <FaLinkedin size={24} />
              </Link>
            )}
            {user.social.instagram && (
              <Link
                href={user.social.instagram}
                target="_blank"
                className="text-[#fe019a] hover:text-indigo-400"
              >
                <FaInstagram size={24} />
              </Link>
            )}
            {user.social.custom && (
              <Link
                href={user.social.custom}
                target="_blank"
                className="text-[#EDE8D0] hover:text-indigo-400"
              >
                <FaGlobe size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeftSection;
