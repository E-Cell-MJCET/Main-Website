"use client";
import Image from 'next/image';
import { FaUserTie, FaUsers } from 'react-icons/fa'; // Add FaUsers for Governing Body badge

import { HeaderProps } from '@/types/ProfileTypes';

const Header: React.FC<HeaderProps> = ({ name, about, member_Type, Location, Personal_url }) => {
  return (
    <div className="rounded-2xl bg-gray-200">
      {/* Banner Section */}
      <div className="relative">
        <Image
          src="/assets/execomTH.webp"
          alt="Banner"
          className="h-58 w-full object-cover md:h-64"
          width={1200}
          height={400}
        />
        <button className="absolute right-4 top-4 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700">
          <i className="fas fa-edit"></i>
        </button>
      </div>
      {/* Profile Picture Section */}
      <div className="relative flex justify-center">
        <div className="-mt-16 size-32 overflow-hidden rounded-full border-4 border-white md:size-40">
          <Image
            src="/assets/Team/Execom/Technical/Adnan/trial_logo.jpg" // This should be dynamically passed as a prop if needed
            alt="Profile"
            className="size-full object-cover"
            width={200}
            height={200}
          />
        </div>
        <button className="absolute bottom-0 right-4 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700">
          <i className="fas fa-camera"></i>
        </button>
      </div>
      {/* User Info Section */}
      <div className="mt-6 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          {name}
          <span className="ml-3 inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-3 py-1 text-sm font-medium text-gray-700">
            {member_Type === "Executive" ? (
              <>
                <FaUserTie className="mr-1" /> Executive Member
              </>
            ) : (
              <>
                <FaUsers className="mr-1" /> Governing Body
              </>
            )}
          </span>
        </h1>
        <p className="mx-8 mt-2 text-gray-600">
          {about}
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4">
          <p className="text-gray-500">{Location}</p>
          {Personal_url && (
            <a href={Personal_url} className="text-blue-500 hover:underline">
              Contact info
            </a>
          )}
        </div>
      </div>
      {/* Links Section */}
      <div className="mt-6 flex items-center justify-center space-x-6">
        {Personal_url && (
          <a href={Personal_url} className="text-blue-500 hover:underline">
            Visit my Website
          </a>
        )}
        <p className="text-gray-500">471 connections</p>
      </div>
      {/* Buttons Section */}
      <div className="mt-6 flex justify-center space-x-4">
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Open to
        </button>
        <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
          Add profile section
        </button>
        <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
          Enhance profile
        </button>
      </div>
      {/* Footer Section */}
      <div className="mt-6 text-center text-gray-500">
        <p>Resources</p>
      </div>
    </div>
  );
};

export default Header;
