// EducationSection.tsx
"use client";
import { motion } from "framer-motion";

import { Achievement } from "@/types/UserTypes";

const AchievementSection = ({ user }: { user: Achievement[] }) => {
  return (
    <motion.div
      className="rounded-xl border-l-4 border-[#8e2ea3] bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-semibold text-gray-100">
        Extracurricular Activities
      </h3>
      {user.map((achieve: any) => (
        <div key={achieve.id} className="mt-4">
          <h4 className="text-xl font-semibold text-gray-200">
            {achieve.title}
          </h4>
          {/* <p className="text-gray-400">Year: {edu.year}</p> */}
          <p className="mt-2 text-gray-300">{achieve.description}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default AchievementSection;
