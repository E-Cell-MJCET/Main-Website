import React from "react";
import { FaCode, FaUsers, FaRegCalendarAlt, FaBusinessTime, FaPalette, FaPenNib, FaCamera, FaBullhorn, FaCog } from "react-icons/fa";

const portfolios = [
  { id: 1, title: "Technical", icon: <FaCode size={40} /> },
  { id: 2, title: "Relations and Outreach", icon: <FaUsers size={40} /> },
  { id: 3, title: "Human Resource", icon: <FaUsers size={40} /> },
  { id: 4, title: "Events", icon: <FaRegCalendarAlt size={40} /> },
  { id: 5, title: "Entrepreneurship Coordinators", icon: <FaBusinessTime size={40} /> },
  { id: 6, title: "Design", icon: <FaPalette size={40} /> },
  { id: 7, title: "Editorial and Research", icon: <FaPenNib size={40} /> },
  { id: 8, title: "Media", icon: <FaCamera size={40} /> },
  { id: 9, title: "Marketing", icon: <FaBullhorn size={40} /> },
  { id: 10, title: "Operations", icon: <FaCog size={40} /> },
];

const SelectPortfolio = () => {
  return (
    <div
      className="min-h-screen px-4 py-10 text-white"
      style={{
        // Dark gradient background with black and gray tones
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.9), rgba(0, 0, 0, 0.8))',
        backgroundSize: '400% 400%',
        animation: 'gradient-motion 10s ease infinite',
      }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-10 mb-10 bg-opacity-70 px-4 py-3 shadow-md backdrop-blur-sm">
        <h1 className="text-shadow-md text-center text-2xl font-bold md:text-4xl">
          Select Your Portfolio
        </h1>
      </div>
      {/* Portfolio grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="flex flex-col items-center rounded-lg bg-blue-800 bg-opacity-70 p-6 text-center shadow-lg transition-colors hover:bg-blue-700"
          >
            <div className="mb-4 text-blue-300">{portfolio.icon}</div>
            <h2 className="text-lg font-semibold">{portfolio.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPortfolio;
