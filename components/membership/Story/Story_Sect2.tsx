"use client";
import { motion } from "framer-motion";

const StorySect2 = () => {
  return (
    <section className="bg-[#f9f9f3] py-12 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center text-2xl font-bold sm:text-3xl md:text-4xl"
        >
          `Your{" "}
          <span className="rounded bg-blue-500 p-1 font-silkscreen text-white">
            time is limited,
          </span>{" "}
          so don&apos;t waste it living{" "}
          <span className="rounded bg-black p-1 font-silkscreen text-[#f6e445]">
            someone&apos;s
          </span>{" "}
          life.` <br />– Steve Jobs
        </motion.h2>
        {/* <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          className="mb-8 flex flex-col items-center justify-center sm:flex-row sm:space-x-8"
        >
          <div className="mb-4 text-center sm:mb-0">
            <Image 
              src="/assets/gallery/1.webp" // Replace with the actual path of 2016 image
              alt="2016"
              width={256} // Adjust the width according to your design
              height={256} // Adjust the height according to your design
              className="mb-2 rounded-lg shadow-lg"
            />
            <p className="text-lg font-bold">2016</p>
          </div>
          <div className="text-center">
            <Image 
              src="/assets/gallery/2.webp" // Replace with the actual path of 2023 image
              alt="2023"
              width={256} // Adjust the width according to your design
              height={256} // Adjust the height according to your design
              className="mb-2 rounded-lg shadow-lg"
            />
            <p className="text-lg font-bold">2023</p>
          </div>
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 text-center text-sm leading-relaxed sm:text-base"
        >
          <p>
            Have you ever felt like time is slipping away, holding you back from
            your true potential?
          </p>
          <p>
            Every moment spent living someone else&apos;s dream is a moment lost
            from creating your own.
          </p>
          <p>
            At Mufakkam Jah College of Engineering and Technology, we believe
            that the spark of entrepreneurship lies within each of us.
          </p>
          <p>
            Embrace your uniqueness, and let your passion drive your journey!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 space-y-4 text-center text-sm sm:text-base"
        >
          <p className="font-bold">So, what&apos;s holding you back?</p>
          <p>
            Here&apos;s what you can achieve when you choose to follow your own
            path:
          </p>
          <ul className="mx-auto max-w-md list-inside list-disc text-left">
            <li>Innovate and create solutions that matter</li>
            <li>Build a network of like-minded entrepreneurs</li>
            <li>Transform challenges into opportunities</li>
            <li>Lead projects that inspire change</li>
            <li>Foster a community that thrives on collaboration</li>
            <li>Make a lasting impact in your field</li>
          </ul>
          <p>
            Remember, the road to success isn&apos;t just about the destination;
            it&apos;s about the journey you create along the way.
          </p>
          <p>The question is:</p>
          <p className="font-bold">
            Are you ready to take the leap and live your own life, not someone
            else&apos;s?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySect2;
