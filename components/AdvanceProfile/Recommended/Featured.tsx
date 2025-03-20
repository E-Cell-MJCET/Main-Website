import {motion} from "framer-motion";
import Link from "next/link";

// Define the types for the JSON data
type FeaturedContent = {
  title: string;
  description: string;
};

interface FeaturedProps {
  featuredItems: FeaturedContent[]; // Array of featured items (title and description)
}

const Featured: React.FC<FeaturedProps> = ({ featuredItems = [] }) => {
  // Limit the featured content to a maximum of 3 items - just like in Step11
  const limitedItems = featuredItems?.slice(0, 3) || [];

  // Animation variants
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };
  
  return (
    <div className="relative bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-20 size-64 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
        <div className="absolute right-1/3 top-40 size-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Featured Content
          </h2>
          {limitedItems.length > 0 ? (
            <p className="mx-auto max-w-2xl text-gray-300">
              Highlights of my best work and most important contributions.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-gray-300">
              No featured content available at the moment.
            </p>
          )}
        </motion.div>
        {limitedItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-48 items-center justify-center rounded-lg bg-indigo-900/50 text-center text-gray-400"
          >
            <p>No featured content to display yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {limitedItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white group-hover:text-indigo-300 md:text-2xl">
                    {item.title || "Untitled"}
                  </h3>
                  <p className="mb-6 text-gray-300">
                    {item.description || "No description available"}
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-indigo-300 transition-colors hover:text-pink-300"
                >
                  Read more
                  <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Featured;