"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function GuidelinesRules() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "shortlisting"
  );

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const sections = [
    {
      id: "shortlisting",
      title: "Shortlisting Process",
      content: (
        <div className="space-y-4">
          <p className="text-[#E0F7FF]">
            After idea submission, entries will be evaluated by experts from
            industry and academia.
          </p>
          <div>
            <p className="mb-2 font-silkscreen text-[#7BF1A7]">
              Evaluation criteria include:
            </p>
            <ul className="list-disc space-y-1 pl-6 text-[#E0F7FF]">
              <li>Novelty of the idea</li>
              <li>Technical complexity and clarity</li>
              <li>Feasibility and sustainability</li>
              <li>Scale of real-world impact</li>
              <li>User experience</li>
              <li>Future scalability and execution potential</li>
            </ul>
          </div>
          <p className="text-[#E0F7FF]">
            Hackcelerate is open to all disciplines and colleges. Final Round
            teams will be shortlisted based on merit, and a waitlist will also
            be maintained to ensure fair opportunity.
          </p>
        </div>
      ),
    },
    {
      id: "registration",
      title: "Final Registration for Shortlisted Teams",
      content: (
        <div className="space-y-4">
          <ul className="list-disc space-y-2 pl-6 text-[#E0F7FF]">
            <li>
              Shortlisted teams will be notified via their registered email IDs.
            </li>
            <li>
              Final registration must be completed within the deadline (to be
              announced).
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "prizes",
      title: "Prizes & Perks",
      content: (
        <div className="space-y-4">
          <ul className="list-disc space-y-2 pl-6 text-[#E0F7FF]">
            <li>Attractive Cash Prizes across all tracks.</li>
            <li>
              Direct Entry to Industry Finale Venue for shortlisted teams.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "tiebreakers",
      title: "Tie Breakers",
      content: (
        <div className="space-y-4">
          <p className="text-[#E0F7FF]">
            In the event of a tie, the final decision will rest with the judges
            and will be binding.
          </p>
        </div>
      ),
    },
    {
      id: "hardware",
      title: "Hardware Setup",
      content: (
        <div className="space-y-4">
          <p className="text-[#E0F7FF]">
            Teams using large peripheral hardware (e.g., robotic arms, drones)
            must seek prior approval from the organizers.
          </p>
        </div>
      ),
    },
    {
      id: "attendance",
      title: "Finale Attendance Requirements",
      content: (
        <div className="space-y-4">
          <ul className="list-disc space-y-2 pl-6 text-[#E0F7FF]">
            <li>
              All team members must be physically present during the final
              round.
            </li>
            <li>
              Each member must carry a valid Aadhaar card and College Photo ID.
            </li>
            <li>
              Teams must present their project to the judges during the assigned
              slot—failure to do so may lead to disqualification.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-[#121212] px-4 py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
      <div className="container relative z-10 mx-auto max-w-4xl">
        <h2
          className="mb-12 text-center font-silkscreen text-4xl md:text-5xl lg:text-6xl"
          style={{
            textShadow: "-3px -3px 0 #3A6695, -6px -6px 0 #3A6695",
          }}
        >
          <span className="text-[#7BF1A7]">GUIDE</span>
          <span className="text-white">LINES</span>
          <span className="text-[#7BF1A7]"> & </span>
          <span className="text-white">RULES</span>
        </h2>
        <div className="space-y-6">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between border-l-4 border-[#7BF1A7] px-6 py-4 transition-colors duration-200 hover:bg-white/10"
              >
                <h3 className="text-left font-silkscreen text-xl text-white md:text-2xl">
                  {section.title}
                </h3>
                {expandedSection === section.id ? (
                  <ChevronUp className="size-6 text-[#7BF1A7]" />
                ) : (
                  <ChevronDown className="size-6 text-[#7BF1A7]" />
                )}
              </button>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 font-block"
                >
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center"></div>
      </div>
    </section>
  );
}
