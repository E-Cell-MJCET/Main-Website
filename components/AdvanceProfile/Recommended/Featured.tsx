import { motion } from "framer-motion";
import Link from "next/link";

import { getFeaturedThemeStyles } from "../Themes/FeaturedTheme";

// Define the types for the JSON data
type FeaturedContent = { title: string; description: string };

interface FeaturedProps {
  featuredItems: FeaturedContent[];
  theme?: string; // New theme prop
}

const Featured: React.FC<FeaturedProps> = ({
  featuredItems = [],
  theme = "Default",
}) => {
  const styles = getFeaturedThemeStyles(theme);
  const limitedItems = featuredItems?.slice(0, 3) || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className={`relative ${styles.backgroundGradient} ${styles.container}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-1/3 top-20 size-64 rounded-full ${styles.decorativeElement} blur-3xl`}
        ></div>
        <div
          className={`absolute right-1/3 top-40 size-80 rounded-full ${styles.decorativeElement} blur-3xl`}
        ></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            className={`mb-4 text-4xl font-bold md:text-5xl ${styles.heading}`}
          >
            Featured Content
          </h2>
          <p className={`mx-auto max-w-2xl ${styles.description}`}>
            {limitedItems.length > 0
              ? "Highlights of my best work and most important contributions."
              : "No featured content available at the moment."}
          </p>
        </motion.div>
        {limitedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex h-48 items-center justify-center rounded-lg ${styles.emptyStateContainer} text-center`}
          >
            <p className={styles.emptyStateText}>
              No featured content to display yet.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${styles.cardContainer}`}
          >
            {limitedItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${styles.card}`}
              >
                <div>
                  <h3
                    className={`mb-4 text-xl font-semibold md:text-2xl ${styles.cardTitle}`}
                  >
                    {item.title || "Untitled"}
                  </h3>
                  <p className={`mb-6 ${styles.cardDescription}`}>
                    {item.description || "No description available"}
                  </p>
                </div>
                <Link
                  href="#"
                  className={`inline-flex items-center text-sm font-medium transition-colors ${styles.cardLink} ${styles.cardLinkHover}`}
                >
                  Read more
                  <svg
                    className="ml-1 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
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
