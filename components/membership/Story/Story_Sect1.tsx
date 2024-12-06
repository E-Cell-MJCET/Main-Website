"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Import the Image component
import Link from "next/link";

const StorySect1 = () => {
  return (
    <section className="bg-black py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Image
              src="/assets/membership/GB.jpg" // Replace with your image path
              alt="Person story"
              className="rounded-lg shadow-lg"
              width={500} // Set your desired width
              height={200} // Set your desired height
            />
            <p className="absolute bottom-4 left-4 text-xs text-white">
              The E-Cell, MJCET <br />
              August 2024
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              `The biggest{" "}
              <span className="font-silkscreen text-[#f6e445]">risk</span> is
              not taking any{" "}
              <span className="font-silkscreen text-[#f6e445]">risk.</span>`
            </h2>
            <br />
            <p className="text-sm leading-relaxed">
              <strong>
                Aspiring Entrepreneurs and Engineers, here’s your moment!
              </strong>
              <br />
              <br />
              At MJCET, we understand one truth: The biggest risk is standing
              still and not taking any risk at all.
            </p>
            <p className="text-sm leading-relaxed">
              Join our Entrepreneurship Cell to connect with trailblazers,
              innovators, and industry experts.
              <br />
              <br />
              Whether you&apos;re an engineer, tech enthusiast, or creative
              thinker, we provide the tools and guidance to turn risks into
              results and ideas into impact.
              <br />
              <br />
              Connect with like-minded peers, seasoned mentors, and access
              resources to launch your journey.
            </p>
            <p className="text-sm leading-relaxed">
              Are you ready to challenge the status quo, push boundaries, and
              make your mark?
            </p>
            <div>
              <Link
                href={"https://forms.gle/ePeDHzKgrb9MUGTx6"}
                className="rounded-lg bg-blue-600 px-8 py-3 font-silkscreen font-bold text-white shadow-md transition duration-300"
              >
                Join the Movement!
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySect1;
