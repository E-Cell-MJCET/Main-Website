"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import Link from "next/link";

interface User {
  name: string;
  profilePicture: string;
  jobTitle: string;
  badges: string[];
  socialMedia: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  isEditing: boolean;
  onEditClick: () => void;
  editedData: { name: string; bio: string; };
  handleChange: (field: string, value: string) => void;
}

const LeftSection = ({ user, isEditing, onEditClick, editedData, handleChange }: User) => {
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
            src={user.profilePicture || "/default-profile.png"}
            alt="Profile Picture"
            layout="fill"
            className="rounded-full border-4 border-indigo-600 object-cover"
          />
        </div>
        {isEditing ? (
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-md bg-gray-700 p-2 text-center text-gray-100"
          />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-100">{user.name}</h1>
        )}
        <h2 className="text-lg text-gray-300">{user.jobTitle}</h2>
        <div className="mt-2 flex space-x-2">
          {user.badges.map((badge, idx) => (
            <span key={idx} className="rounded-full bg-indigo-500 px-3 py-1 text-xs text-white">
              {badge}
            </span>
          ))}
        </div>
        {/* Social Media Links */}
        <div className="mt-4 w-full space-y-4">
          <div className="flex justify-center gap-4">
            {user.socialMedia.github && (
              <Link href={user.socialMedia.github} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                <FaGithub size={24} />
              </Link>
            )}
            {user.socialMedia.linkedin && (
              <Link href={user.socialMedia.linkedin} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                <FaLinkedin size={24} />
              </Link>
            )}
            {user.socialMedia.instagram && (
              <Link href={user.socialMedia.instagram} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                <FaInstagram size={24} />
              </Link>
            )}
            {user.socialMedia.website && (
              <Link href={user.socialMedia.website} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                <FaGlobe size={24} />
              </Link>
            )}
          </div>
        </div>
        {/* Edit Profile Button */}
        <button
          className={`mt-6 rounded-lg ${isEditing ? "bg-green-600 hover:bg-green-500" : "bg-indigo-600 hover:bg-indigo-500"} px-4 py-2 text-white shadow-md transition duration-200`}
          onClick={onEditClick}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </motion.div>
  );
};

export default LeftSection;
