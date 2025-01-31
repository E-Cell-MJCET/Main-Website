import { motion } from "framer-motion";
import React, { useEffect } from "react";

const Step1Welcome = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    // Generate a unique session ID if it doesn't already exist
    const generateSessionId = () => {
      const existingSessionId = localStorage.getItem("personalized_session_id");
      if (!existingSessionId) {
        const newSessionId = Array.from({ length: 20 }, () =>
          Math.random().toString(36).charAt(2)
        ).join("");
        console.log("Generated Session ID:", newSessionId);
     if (typeof window !== "undefined") {
      localStorage.setItem("personalized_session_id", newSessionId);
      console.log("Generated Session ID:", newSessionId);
      }
      } else {
        console.log("Existing Session ID:", existingSessionId);
      }
    };

    generateSessionId();
  }, []);
  // typeof window !== "undefined" ?   console.log(localStorage.getItem("personalized_session_id"))  :   console.log("undefined PID")  ;
  console.log(localStorage.getItem("personalized_session_id"));

  return (
    <motion.div
    //   className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white"
    className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-[#39ff14]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Welcome Text */}
      <div className="max-w-xl text-center">
        <motion.h1
          className="mb-4 text-4xl font-bold md:text-6xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Welcome! 🎉
        </motion.h1>
        <motion.p
          className="mb-8 text-lg font-light md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Let`s create a personalized Portfolio specially crafted for you !
        </motion.p>
      </div>
      {/* Start Button */}
      <motion.button
        className="rounded-full bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition duration-300 hover:bg-gray-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
      >
        Start
      </motion.button>
    </motion.div>
  );
};

export default Step1Welcome;
