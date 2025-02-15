"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Step2Welcome = ({
  onNext,
  // eslint-disable-next-line no-unused-vars
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [otherHobby, setOtherHobby] = useState("");

  const hobbies = ["Dark", "Light", "Music", "Cooking", "Writing", "Fitness"];

  const handleCheckboxChange = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((item) => item !== hobby) : [...prev, hobby]
    );
  };

  const handleOtherHobbyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherHobby(event.target.value);
  };

  const handleNext = () => {
    // Collect selected hobbies and proceed
    const allHobbies = [...selectedHobbies];
    if (otherHobby.trim()) allHobbies.push(otherHobby.trim());
    console.log("Selected Hobbies:", allHobbies);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          What Theme would you like to have ?
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {hobbies.map((hobby) => (
            <label
              key={hobby}
              className="flex cursor-pointer items-center space-x-3 rounded-lg bg-indigo-50 p-3 transition hover:bg-indigo-100"
            >
              <input
                type="checkbox"
                value={hobby}
                checked={selectedHobbies.includes(hobby)}
                onChange={() => handleCheckboxChange(hobby)}
                className="form-checkbox size-5 text-indigo-500"
              />
              <span className="font-medium text-gray-700">{hobby}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <label htmlFor="other-hobby" className="mb-2 block font-medium text-gray-700">
            Other Hobby (Optional):
          </label>
          <input
            id="other-hobby"
            type="text"
            value={otherHobby}
            onChange={handleOtherHobbyChange}
            placeholder="Enter your hobby"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedHobbies.length === 0 && !otherHobby.trim()}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              selectedHobbies.length === 0 && !otherHobby.trim()
                ? "cursor-not-allowed bg-gray-300"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step2Welcome;
