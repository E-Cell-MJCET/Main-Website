"use client";
import React from "react";
import { motion } from "framer-motion";

const StorySect3 = () => {
  return (
    <section className="mb-8 bg-black px-6 py-5 text-white md:px-16">
      <div className="mx-auto max-w-6xl text-center">
        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-silkscreen text-sm font-semibold uppercase text-[#f6e445]"
        >
          Our objective here is simple...
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-3xl font-bold md:text-5xl"
        >
          The objective of E-Cell MJCET is to inspire and empower students to
          ideate, innovate,
          <br />
          and incubate entrepreneurial ventures that create lasting impact.
        </motion.h2>
        {/* <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Image
              src="/assets/gallery/4.webp"
              alt="Laptop with program"
              width={800} // Set appropriate width
              height={600} // Set appropriate height
              className="w-full max-w-md md:max-w-2xl"
            />
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};

export default StorySect3;
