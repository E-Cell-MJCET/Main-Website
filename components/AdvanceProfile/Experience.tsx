/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable no-unused-vars */
"use client";
import { motion } from "framer-motion";

import { ParticleCanvas } from "@/hooks/particle";

interface Company {
  company_name: string;
  location: string;
  roles: Role[];
}

interface Role {
  title: string;
  startDate: string;
  endDate: string | null;
  duration: string;
  responsibilities: string[];
}
interface ExperienceItem {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking?: boolean;
  description: string; // This could be a JSON string of responsibilities
}

interface ExperienceProps {
  experienceData: ExperienceItem[];
}

const AdvExperience: React.FC<ExperienceProps> = ({ experienceData }) => {
  // Group experiences by company for organization
  const experiencesByCompany = experienceData.reduce(
    (acc: Record<string, ExperienceItem[]>, exp: ExperienceItem) => {
      const companyKey = `${exp.company}`;
      if (!acc[companyKey]) {
        acc[companyKey] = [];
      }
      acc[companyKey].push(exp);

      return acc;
    },
    {}
  );

  // Parse description if it's a JSON string
  const parseResponsibilities = (description: string) => {
    try {
      const parsed = JSON.parse(description);
      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [description]; // Not an array, just return as single item
    } catch (e) {
      // If parsing fails, just use the raw text
      return [description];
    }
  };

  const calculateDuration = (
    startDate: string,
    endDate: string,
    isCurrentlyWorking?: boolean
  ) => {
    const start = new Date(startDate);
    const end = isCurrentlyWorking ? new Date() : new Date(endDate);

    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = end.getMonth() - start.getMonth();

    let years = diffYears;
    let months = diffMonths;

    if (diffMonths < 0) {
      years--;
      months += 12;
    }

    const yearText = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
    const monthText =
      months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : "";

    if (yearText && monthText) {
      return `${yearText}, ${monthText}`;
    }

    return yearText || monthText || "Less than a month";
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-black to-gray-900 py-12">
      {/* Particle Canvas for Experience Background */}
      <ParticleCanvas />
      {/* Experience Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-white">
          Professional Experience
        </h1>
        <div className="mx-auto mt-2 h-1 w-20 bg-blue-500"></div>
      </motion.div>
      {/* Experience Timeline */}
      <div className="relative z-10 mx-auto w-11/12 max-w-4xl">
        {Object.entries(experiencesByCompany).map(
          ([companyKey, experiences], companyIndex) => {
            const [companyName] = companyKey.split("-");

            return (
              <motion.div
                key={companyKey}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: companyIndex * 0.1 }}
                className="mb-10"
              >
                {/* Company Card Header */}
                <div className="mb-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                      {companyName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-white">
                        {companyName}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Roles at the Company */}
                <div className="ml-6 border-l-2 border-blue-500 pl-6">
                  {experiences.map((experience, index) => {
                    const responsibilities = parseResponsibilities(
                      experience.description
                    );
                    const duration = calculateDuration(
                      experience.startDate,
                      experience.endDate,
                      experience.isCurrentlyWorking
                    );

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="relative mb-6"
                      >
                        {/* Timeline Node */}
                        <div className="absolute -left-9 mt-1 size-5 rounded-full bg-blue-500"></div>
                        {/* Role Details */}
                        <div className="rounded-lg bg-gray-800 bg-opacity-70 p-5 backdrop-blur-sm">
                          <div className="mb-2 flex flex-wrap items-start justify-between">
                            <h3 className="text-lg font-semibold text-white md:text-xl">
                              {experience.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center space-x-2 text-sm text-gray-300 md:mt-0">
                              <span>
                                {experience.startDate} -{" "}
                                {experience.isCurrentlyWorking
                                  ? "Present"
                                  : experience.endDate}
                              </span>
                              <span className="rounded-full bg-blue-900 px-3 py-1 text-xs">
                                {duration}
                              </span>
                            </div>
                          </div>
                          {/* Responsibilities */}
                          {responsibilities.length > 0 && (
                            <ul className="ml-4 list-disc space-y-1 text-gray-300">
                              {responsibilities.map((resp, respIndex) => (
                                <li
                                  key={respIndex}
                                  className="text-sm md:text-base"
                                >
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AdvExperience;
