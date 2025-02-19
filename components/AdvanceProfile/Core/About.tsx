import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define the props interface
interface AboutProps {
  aboutText: string;
}

const About: React.FC<AboutProps> = ({ aboutText }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      {/* Wave Background Animation */}
      <div className="absolute bottom-0 left-0 z-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-20 w-full md:h-24 lg:h-32"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-current text-white"
            opacity="0.25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-current text-white"
            opacity="0.5"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current text-white"
          ></path>
        </svg>
      </div>
      {/* Content */}
      <motion.div
        className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-8 px-4 md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image Section */}
        <motion.div
          className="relative w-full md:w-1/2 lg:w-1/3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/assets/execomTH.webp" // Replace with your image path in the public folder
            alt="About Us"
            width={500}
            height={500}
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </motion.div>
        {/* Text Section */}
        <motion.div
          className="w-full text-center md:w-1/2 md:text-left lg:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-800">About Us</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {aboutText}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;