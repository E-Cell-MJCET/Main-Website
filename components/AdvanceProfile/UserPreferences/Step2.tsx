"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoInformationCircleOutline } from "react-icons/io5";

// Define theme information types
type ThemeInfoData = {
  description: string;
  idealFor: string;
  colorCombinations: string;
};

type ThemeInfoMap = {
  [key: string]: ThemeInfoData;
};

// Theme information data
const themeInfo: ThemeInfoMap = {
  "Gradient Theme": {
    description: "Gradients offer a modern, smooth, and dynamic visual experience that captivates the user. They create a sense of depth and motion that makes the website feel alive. The use of smooth color transitions adds a polished and high-end look. Plus, the variety of gradients (like sunset, ocean, or pink-purple) gives you flexibility to align the design with your personal style or industry.",
    idealFor: "Developers, UI/UX designers, digital artists, and anyone who wants a contemporary, sophisticated, and visually stimulating website.",
    colorCombinations: "Pink to Purple to Blue: A futuristic or tech-inspired gradient."
  },
  "Monochromatic Theme": {
    description: "A monochromatic theme creates a sleek, cohesive, and sophisticated look by using varying shades of a single color. This theme's simplicity can be incredibly elegant while still feeling dynamic through different shades, gradients, and textures. It's subtle, minimalist, and ensures that the content (your work) remains the primary focus, making it ideal for professional portfolios.",
    idealFor: "Designers, photographers, architects, and professionals who prefer a clean, refined aesthetic without overwhelming the viewer with too many colors.",
    colorCombinations: "Grayscale: Using different shades of gray and black for a minimalist, timeless look."
  },
  "Dark Theme with accent colors": {
    description: "A dark theme provides a dramatic and contemporary backdrop that allows accent colors to pop, creating a striking contrast. This theme brings focus to key design elements, such as buttons, headings, and portfolio items. The combination of dark tones with bright accent colors adds vibrancy and energy, making the website feel cutting-edge and sophisticated.",
    idealFor: "Tech professionals, digital artists, creative developers, and anyone who wants to showcase a modern, sleek, and high-tech aesthetic.",
    colorCombinations: "Dark Navy with Gold or Silver Accents: Adds a luxurious, high-end appeal."
  },
  "Default": {
    description: "Specially designed By Adnan",
    idealFor: "",
    colorCombinations: ""
  }
};

// Define modal component props
interface ThemeInfoModalProps {
  theme: string;
  onClose: () => void;
}

// Modal Component
const ThemeInfoModal: React.FC<ThemeInfoModalProps> = ({ theme, onClose }) => {
  const info = themeInfo[theme];
  
  if (!info) return null;
  
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">{theme}</h2>
          <p className="mb-4 text-gray-700">{info.description}</p>
          {info.idealFor && (
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Ideal For</h3>
              <p className="text-gray-700">{info.idealFor}</p>
            </div>
          )}
          {info.colorCombinations && (
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Color Combinations</h3>
              <p className="text-gray-700">{info.colorCombinations}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Step2Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [selected_Theme, setSelected_Theme] = useState("");
  const [buildSuggest, setBuildSuggest] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");

  const Themes_Available = [
    "Gradient Theme",
    "Monochromatic Theme",
    "Dark Theme with accent colors",
    "Default",
  ];

  useEffect(()=>{
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedTheme = localStorage.getItem(`${sessionId}_theme`);
      const savedBackground = localStorage.getItem(`${sessionId}_theme_suggest`);
      
      if (savedTheme) setSelected_Theme(savedTheme);
      if (savedBackground) setBuildSuggest(savedBackground);
    }
  },[])

  const handleNext = () => {
    // Save data to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_theme`, selected_Theme);
      localStorage.setItem(`${sessionId}_theme_background`, buildSuggest);
    }

    onNext();
  };
  
  const openThemeInfo = (theme: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent label click from selecting the theme
    e.stopPropagation(); // Prevent event bubbling
    setCurrentTheme(theme);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-yellow-50 to-orange-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          What Theme would you like to have ?🎨
        </h2>
        {/* Skill Level Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Select Theme:
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Themes_Available.map((level) => (
              <label
                key={level}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  selected_Theme === level
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setSelected_Theme(level)}
              >
                <input
                  type="radio"
                  name="skillLevel"
                  value={level}
                  checked={selected_Theme === level}
                  onChange={() => setSelected_Theme(level)}
                  className="form-radio size-5 text-orange-500"
                />
                <span className="font-medium text-gray-700">{level}</span>
                <button
                  onClick={(e) => openThemeInfo(level, e)}
                  className="ml-2 text-gray-500 hover:text-orange-500"
                  aria-label={`Learn more about ${level}`}
                >
                  <IoInformationCircleOutline size={20} />
                </button>
              </label>
            ))}
          </div>
        </div>
        {/* Background Input */}
        <div className="mb-6">
          <label
            htmlFor="buildSuggest"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Leave what would you like us to build (Optional):
          </label>
          <textarea
            id="buildSuggest"
            value={buildSuggest}
            onChange={(e) => setBuildSuggest(e.target.value)}
            placeholder="Describe your preferred color combinations or themes."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-orange-500 focus:ring-orange-500"
          ></textarea>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!selected_Theme}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !selected_Theme
                ? "cursor-not-allowed bg-gray-300"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
      {/* Theme Info Modal */}
      {showModal && (
        <ThemeInfoModal 
          theme={currentTheme}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Step2Welcome;