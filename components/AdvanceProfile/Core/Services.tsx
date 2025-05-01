"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getServicesThemeStyles } from "../Themes/ServicesTheme";

// Match Step13 data structure exactly
type Service = {
  name: string;
  description: string;
  specialties: string;
  pricing: string;
};

// Updated props interface to include theme parameter
interface ServicesProps {
  services: Service[];
  theme?: string; // Optional theme parameter
}

const Services: React.FC<ServicesProps> = ({
  services = [],
  theme = "Default", // Default theme if none provided
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Early return if no services
  if (!services?.length) {
    return null;
  }

  // Get theme styles
  const styles = getServicesThemeStyles(theme);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Handler for opening/closing service detail
  const toggleServiceDetail = (service: Service | null) => {
    setSelectedService(service);
  };

  return (
    <div className={`${styles.container} ${styles.backgroundGradient}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-1/4 top-20 size-64 rounded-full ${styles.decorativeElement1}`}
        ></div>
        <div
          className={`absolute right-1/4 top-60 size-80 rounded-full ${styles.decorativeElement2}`}
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
            className={`mb-4 ${styles.mainHeading} text-4xl font-bold md:text-5xl`}
          >
            My Services
          </h2>
          <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
            Professional services tailored to meet your specific needs with
            expertise and precision.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid ${styles.cardContainer}`}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`group flex h-full flex-col overflow-hidden rounded-xl ${styles.card} shadow-xl backdrop-blur-sm transition-all duration-300`}
            >
              {/* Service Icon */}
              <div
                className={`flex h-32 items-center justify-center ${styles.cardIconContainer}`}
              >
                <svg
                  className={`size-16 ${styles.cardIcon}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 13.5C10.5 13.5 11 15.5 13.5 15.5C16 15.5 16.5 13 16.5 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 7.5C16.5 7.5 16 10 13.5 10C11 10 10.5 7.5 10.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7.5 10.5C7.5 10.5 9 10 9 7.5C9 5 7 4.5 7 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 13.5C7 13.5 5 14 5 16.5C5 19 7.5 19.5 7.5 19.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 4.5C17 4.5 15 5 15 7.5C15 10 16.5 10.5 16.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 19.5C16.5 19.5 19 19 19 16.5C19 14 17 13.5 17 13.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Service Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3
                    className={`mb-2 text-xl font-bold ${styles.cardTitle} ${styles.cardTitleHover} md:text-2xl`}
                  >
                    {service.name}
                  </h3>
                  {/* Price Badge */}
                  <span
                    className={`rounded-full ${styles.priceBadge} px-3 py-1 text-xs font-semibold ${styles.priceBadgeText}`}
                  >
                    {service.pricing}
                  </span>
                </div>
                <p
                  className={`mb-4 line-clamp-3 flex-1 text-sm ${styles.cardDescription}`}
                >
                  {service.description}
                </p>
                {/* Action Button */}
                <button
                  onClick={() => toggleServiceDetail(service)}
                  className={`mt-auto w-full rounded-lg ${styles.detailsButton} px-4 py-2 text-center text-sm font-medium transition-all ${styles.detailsButtonHover}`}
                >
                  View Service Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.modalOverlay}`}
            onClick={() => toggleServiceDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl ${styles.modalContainer} p-8 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => toggleServiceDetail(null)}
                className={`absolute right-4 top-4 z-10 rounded-full ${styles.closeButton} p-2 ${styles.closeButtonHover}`}
                aria-label="Close details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Service Icon */}
              <div className="mb-6 flex justify-center">
                <div
                  className={`rounded-full ${styles.modalIconContainer} p-4`}
                >
                  <svg
                    className={`size-12 ${styles.modalIcon}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 13.5C10.5 13.5 11 15.5 13.5 15.5C16 15.5 16.5 13 16.5 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 7.5C16.5 7.5 16 10 13.5 10C11 10 10.5 7.5 10.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.5 10.5C7.5 10.5 9 10 9 7.5C9 5 7 4.5 7 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13.5C7 13.5 5 14 5 16.5C5 19 7.5 19.5 7.5 19.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 4.5C17 4.5 15 5 15 7.5C15 10 16.5 10.5 16.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 19.5C16.5 19.5 19 19 19 16.5C19 14 17 13.5 17 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Service Details */}
              <div className="mb-4 flex items-center justify-between">
                <h3
                  className={`text-2xl font-bold ${styles.modalTitle} md:text-3xl`}
                >
                  {selectedService.name}
                </h3>
                <span
                  className={`rounded-lg ${styles.modalPriceBadge} px-4 py-1 text-base font-bold ${styles.modalPriceText}`}
                >
                  {selectedService.pricing}
                </span>
              </div>
              {/* Description */}
              <div className="mb-6">
                <h4
                  className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalSectionTitle}`}
                >
                  Description
                </h4>
                <p className={styles.modalDescription}>
                  {selectedService.description}
                </p>
              </div>
              {/* Specialties */}
              <div className="mb-8">
                <h4
                  className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalSectionTitle}`}
                >
                  Specialties
                </h4>
                <div className={`rounded-lg ${styles.modalSpecialtiesBox} p-4`}>
                  <p
                    className={`whitespace-pre-line ${styles.modalSpecialties}`}
                  >
                    {selectedService.specialties}
                  </p>
                </div>
              </div>
              {/* Contact/Inquiry Button */}
              <button
                className={`w-full rounded-lg ${styles.modalInquireButton} px-6 py-3 font-bold transition-all ${styles.modalInquireButtonHover}`}
              >
                Inquire About This Service
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
