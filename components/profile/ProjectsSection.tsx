// EducationSection.tsx
"use client";
import { motion } from "framer-motion";

import { Projects } from "@/types/UserTypes";

const ProjectSection = ({ user }: { user: Projects[] }) => {
  return (
    <motion.div
      className="rounded-xl border-l-4 border-[#EDE8D0] bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-semibold text-gray-100">Projects</h3>
      {user.map((projects: any) => (
        <div key={projects.id} className="mt-4">
          <h4 className="text-xl font-semibold text-gray-200">
            {projects.title}
          </h4>
          <p className="text-gray-400">{projects.year}</p>
          <p className="mt-2 text-gray-300">{projects.description}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default ProjectSection;
