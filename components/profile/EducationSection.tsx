// EducationSection.tsx
"use client";
import { motion } from "framer-motion";

import { Education } from "@/types/UserTypes";

const EducationSection = ({ user }: { user: Education[] }) => {
  return (
    <motion.div
      className="rounded-xl border-l-4 border-[#8e2ea3] bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-semibold text-gray-100">Education</h3>
      {user.map((edu: any) => (
        <div key={edu.id} className="mt-4">
          <h4 className="text-xl font-semibold text-gray-200">
            {edu.degree} from {edu.school}
          </h4>
          {/* <p className="text-gray-400">Year: {edu.year}</p> */}
          <p className="mt-2 text-gray-300">{edu.description}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default EducationSection;
