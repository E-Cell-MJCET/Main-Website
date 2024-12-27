// AboutSection.tsx
import { FC } from "react";
import { motion } from "framer-motion";

import { UserType } from "@/types/UserTypes";

interface AboutSectionProps {
  user: UserType;
}

const AboutSection: FC<AboutSectionProps> = ({ user }) => {
  return (
    <motion.div
      className="rounded-xl border-l-4 border-[#8e2ea3] bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-100">About</h3>
      </div>
      {/* Static About Text */}
      <p className="mt-4 text-gray-300">{user.about}</p>
    </motion.div>
  );
};

export default AboutSection;
