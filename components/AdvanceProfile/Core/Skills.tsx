import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SkillsProps {
  skills: {
    [category: string]: string[];
  };
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(skills)[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true); // Ensures this runs only on the client-side
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const hoverVariants = {
    scale: 1.05,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  };

  const handleShowMore = (category: string) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the modal from closing if clicked inside
  };

  const handleBackdropClick = () => {
    setModalOpen(false); // Close the modal if clicked outside
    setSelectedCategory(null);
  };

  if (!hasMounted) {
    return null; // Ensure nothing renders until after the first mount
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black px-4 py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          Your Skills Showcase Your Perfectionism
        </h2>
        {/* Category Tabs */}
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.keys(skills).map((category, index) => (
            <motion.button
              key={index}
              className={`rounded-lg px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(category)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        {/* Skill Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills[activeCategory].slice(0, 2).map((skill, skillIndex) => (
            <motion.div
              key={skillIndex}
              className="cursor-pointer rounded-lg bg-gray-800 p-6 shadow-lg"
              variants={itemVariants}
              whileHover={hoverVariants}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className="text-sm text-gray-300">{skill}</p>
            </motion.div>
          ))}
          {/* "Show More" button in the same row as skills */}
          {skills[activeCategory].length > 2 && (
            <motion.button
              className="col-span-1 mt-4 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 md:col-span-1 lg:col-span-1"
              onClick={() => handleShowMore(activeCategory)}
            >
              Show More
            </motion.button>
          )}
        </motion.div>
      </div>
      {/* Modal */}
      {modalOpen && selectedCategory && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div
            className="w-full max-w-lg rounded-lg bg-gray-800 p-8"
            onClick={handleModalClick}
          >
            <h3 className="mb-6 text-2xl text-white">{selectedCategory} Skills</h3>
            <motion.div
              className="max-h-96 space-y-4 overflow-y-auto" // Added scroll
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills[selectedCategory].map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className="rounded-lg bg-gray-700 p-4 shadow-lg"
                  variants={itemVariants}
                >
                  <p className="text-sm text-gray-300">{skill}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-6 text-center">
              <motion.button
                className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                onClick={handleCloseModal}
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
