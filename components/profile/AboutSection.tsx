// AboutSection.tsx
import { FC } from "react";
import { motion } from "framer-motion";

import { UserType } from "@/types/UserTypes";

// import { User } from "../types"; // Assuming you have a separate types file for User, Education, etc.

interface AboutSectionProps {
  user: UserType;
  isEditing: boolean;
  onEditClick: () => void;
  editedData: any;
  handleChange: (field: string, value: string) => void;
}

const AboutSection: FC<AboutSectionProps> = ({
  user,
  isEditing,
  editedData,
  handleChange,
}) => {
  return (
    <motion.div
      className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-100">About</h3>
      </div>
      {/* About Text Area */}
      {isEditing ? (
        <textarea
          value={editedData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="mt-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
        />
      ) : (
        <p className="mt-4 text-gray-300">{user.about}</p>
      )}
    </motion.div>
  );
};

export default AboutSection;
