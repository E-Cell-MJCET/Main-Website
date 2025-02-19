"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import {motion,useScroll,useTransform} from "framer-motion";
import { FaInstagram, FaLinkedin, FaGlobe, FaBehance, FaUserTie, FaUsers } from 'react-icons/fa';

import { HeaderProps } from '@/types/ProfileTypes';

import Popup from './ContactPopup'; // Import the Popup component

const Header: React.FC<HeaderProps> = ({ name, Tagline, member_Type, Location, Personal_url,contact_info }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  // Function to open the popup
  const openPopup = () => setIsPopupOpen(true);

  // Function to close the popup
  const closePopup = () => setIsPopupOpen(false);

  const {scrollY} = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 80]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-r from-black to-teal-900 p-6 text-white md:flex-row md:items-center md:justify-between">
      {/* Left Content Section */}
      <div className="flex w-full flex-col items-start space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold md:text-4xl">Hi! 👋<br /> I`m {name}</h1>
        <p className="text-lg text-gray-300">{Tagline}</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-400">{Location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-3 py-1 text-sm font-medium text-gray-300">
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
        </div>
        {/* Show Contact Info Button */}
        <button
          onClick={openPopup}
          className="mt-4 rounded-md px-4 py-2 text-blue-500 hover:bg-black hover:text-white"
        >
          Show Contact Info
        </button>
        {/* Buttons Section */}
        <div className="mt-4 flex space-x-4">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Download CV
          </button>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaLinkedin size={24} />
            </a>
            <a href={Personal_url} className="text-gray-400 hover:text-blue-500">
              <FaGlobe size={24} />
            </a>
            <a href={Personal_url} className="text-gray-400 hover:text-blue-500">
              <FaBehance size={24} />
            </a>
          </div>
        </div>
      </div>
      {/* Right Image Section */}
      {/* <div className="relative mt-8 flex w-full justify-center md:mt-0 md:w-1/2">
        <div className="h-[350px] w-[250px] rounded-lg border-4 border-blue-500 shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-700 md:h-[400px] md:w-[280px]">
          <Image
            src="/assets/Team/Execom/Technical/Adnan/trial_logo.jpg" // Replace with dynamic image if needed
            alt="Profile"
            className="size-full object-cover"
            width={280}
            height={400}
          />
        </div>
      </div> */}
      {/* Image Card */}
      <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            // className="relative lg:w-2/5"
            className="relative mt-8  w-full md:w-2/5"
            style={{y}}
        >
        {/* <div className="realtive group aspect-square w-full"> */}
        <div className="realtive aspect-w-1 aspect-h-1/2 group w-full overflow-y-hidden">
          {/* Animated Border */}
          <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'mirror'
                }}
                className="absoulte to-tertiary/30 inset-0
                    rounded-3xl bg-gradient-to-r
                from-primary/30 via-secondary/30
                  opacity-50"
            />
          {/* Floating Animation */}
          <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="realtive bg-surface aspect-square 
                w-full overflow-hidden
                rounded-3xl border border-white/10 
                backdrop-blur-sm"
            >
            <Image src="/assets/Team/Execom/Technical/Adnan/trial_logo.jpg"
                alt="Avatar"
                fill
                className="scale-10
                0 object-cover transition-transform
                        duration-500 group-hover:scale-100" />
            <div
                className="absoulte inset-0 bg-gradient-to-t
                    from-black/60 to-transparent"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 0.6
                }}
                className="absolute bottom-8 left-8"
            >
              <div className="text-content text-2xl font-bold">
                Based in
                <motion.span
                      className="block bg-gradient-to-r
                       from-primary to-secondary bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'mirror'
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                  {Location}
                </motion.span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
      {/* Contact Info Popup */}
      <Popup isOpen={isPopupOpen} onClose={closePopup} contact_info={contact_info}/>
    </div>
  );
};

export default Header;
