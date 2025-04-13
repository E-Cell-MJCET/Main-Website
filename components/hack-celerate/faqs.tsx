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
    question: "What is HACK-CELERATE?",
    answer:
      "It is not just a hackathon—it is an epic fusion of creativity, caffeine, and code! Think of it as a 48-hour sprint where brilliant minds come together to solve real problems, build cool stuff, and maybe win some brag-worthy prizes. Whether you're a coding ninja, a design wizard, or just someone with crazy ideas—everyone is welcome!",
  },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer:
      'Students, beginners, pros... if you have got the passion, you have got a spot here. Just click that big, shiny "Register Now" button on our website, fill in your details, and boom—you are in! Do not wait too long though; spots fill up fast!',
  },
  {
    id: "no-team",
    question: "What if I don't have a team?",
    answer:
      "No worries! We have got a team formation session before the hackathon kicks off. So, you will find your crew and maybe your next best friends.",
  },
  {
    id: "solo-participation",
    question: "Can I participate solo?",
    answer:
      "No, teams must have a minimum of 2 members (maximum 4). We will help you find teammates if needed!",
  },
  {
    id: "registration-fee",
    question: "Is there a registration fee?",
    answer:
      "No, HACK-CELERATE is completely free! Just register and you are in. There are no registration fees or hidden charges.",
  },
];

export default function faqSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="faq" className="py-12 sm:py-24 bg-black px-4 sm:px-6">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-block mb-4 sm:mb-6"
            style={{ color: "#7BF1A7" }}
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground font-block max-w-3xl mx-auto px-4">
            Got questions? We've got answers!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto px-4"
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
                className="bg-[#3B6593] rounded-lg border border-[#3B6593] px-4 sm:px-6"
              >
                <AccordionTrigger
                  className="text-base sm:text-lg font-semibold py-3 sm:py-4 transition-colors"
                  style={{ color: "#7BF1A7" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-[#7BF1A7] pb-3 sm:pb-4">
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
