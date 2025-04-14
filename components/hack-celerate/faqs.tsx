"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "what-is-hack",
    question: "What is Hackcelerate?",
    answer:
      "It is not just a hackathon—it is an epic fusion of creativity, caffeine, and code! Think of it as a 48-hour sprint where brilliant minds come together to solve real problems, build cool stuff, and maybe win some brag-worthy prizes. Whether you're a coding ninja, a design wizard, or just someone with crazy ideas—everyone is welcome!",
  },
  {
    id: "purpose",
    question: "What is the purpose of the hackathon?",
    answer:
      "The hackathon is designed to bring together creative minds to solve real-world problems through innovation and collaboration. It's a platform to ideate, build, and present impactful solutions.",
  },
  {
    id: "theme",
    question: "What is the theme of the hackathon?",
    answer:
      "The hackathon follows an open innovation theme — participants are free to work on any project or problem statement of their choice.",
  },
  {
    id: "tracks",
    question: "Are there any specific tracks or domains?",
    answer:
      "No, there are no fixed tracks. You can choose any domain you're passionate about, as long as your solution is impactful and innovative.",
  },
  // {
  //   id: "judging-criteria",
  //   question: "What is the judging criteria?",
  //   answer:
  //     "Judging will be based on the following factors: Innovation & Creativity, Relevance to a Real-World Problem, Feasibility & Impact, Technical implementation, Presentation & Communication, and Execution/Prototype Quality (even non-technical solutions will be evaluated fairly).",
  // },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer:
      'Students, beginners, pros... if you have got the passion, you have got a spot here. Just click that big, shiny "Register Now" button on our website, fill in your details, and boom—you are in! Do not wait too long though; spots fill up fast!',
  },
  {
    id: "non-technical",
    question: "I don't have a technical background – can I still participate?",
    answer:
      "Absolutely! Hackathons are not just for coders. Anyone with ideas, design thinking, storytelling, or problem-solving skills is welcome.",
  },
  // {
  //   id: "no-team",
  //   question: "What if I don't have a team?",
  //   answer:
  //     "No worries! We have got a team formation session before the hackathon kicks off. So, you will find your crew and maybe your next best friends.",
  // },
  {
    id: "solo-participation",
    question: "Can I participate solo?",
    answer:
      "Yes! You can participate as an individual. But participating as a team is encouraged.",
  },
  {
    id: "collaboration",
    question:
      "Can I collaborate with people from different colleges or cities?",
    answer:
      "Yes, you can collaborate with participants from other colleges or different locations.",
  },
  {
    id: "outside-hyderabad",
    question: "I'm from outside Hyderabad – can I still participate?",
    answer:
      "Yes! The online round is open to everyone, regardless of where you're from.",
  },
  // {
  //   id: "registration-fee",
  //   question: "Is there a registration fee?",
  //   answer:
  //     "No, HACK-CELERATE is completely free! Just register and you are in. There are no registration fees or hidden charges.",
  // },
  {
    id: "registration-deadline",
    question: "What is the deadline for registration?",
    answer:
      "The registration deadline will be updated soon. Please check our website or Instagram for the latest updates.",
  },
  {
    id: "how-it-works",
    question: "How will the hackathon work?",
    answer:
      "The hackathon has two phases: 1) Online Round (Final Phase): A 24-hour hackathon conducted on Discord where you'll build and submit your project. 2) Offline Round: Shortlisted participants will be invited to a venue for a rapid-fire pitch session in front of a panel of judges.",
  },
  {
    id: "duration",
    question: "How long will the hackathon be?",
    answer:
      "Online Round: 24 hours. Offline Round: Short and concise, mainly focused on final presentations and Q&A with judges.",
  },
];

export default function FaqSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="faq" className="bg-black px-4 py-12 sm:px-6 sm:py-24">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-16"
        >
          <h2
            className="mb-4 font-block text-2xl sm:mb-6 sm:text-3xl md:text-5xl"
            style={{ color: "#7BF1A7" }}
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mx-auto max-w-3xl px-4 font-block text-base text-muted-foreground sm:text-xl">
            Got questions? We&apos;ve got answers!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl px-4"
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-3 sm:space-y-4"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-lg border border-[#3B6593] bg-gradient-to-br from-gray-900 to-gray-800 px-4 sm:px-6"
              >
                <AccordionTrigger
                  className="py-3 text-left font-block text-base font-semibold transition-colors sm:py-4 sm:text-lg"
                  style={{ color: "#7BF1A7" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-3 text-sm text-[#7BF1A7] sm:pb-4 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
