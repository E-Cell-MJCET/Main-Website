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
                className="rounded-lg border border-[#3B6593] bg-[#3B6593] px-4 sm:px-6"
              >
                <AccordionTrigger
                  className="py-3 text-base font-semibold transition-colors sm:py-4 sm:text-lg"
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
