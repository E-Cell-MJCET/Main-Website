import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ShootingStars } from "../ui/shootingstars";
import { StarsBackground } from "../ui/starsbackground";

export function FaqComp() {
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-3 bg-black p-5 text-white">
      <div className="text-center">
        <h1 className="font-silkscreen text-3xl font-bold text-[#f6e445] sm:text-4xl">
          Frequently Asked Questions
        </h1>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-black font-silkscreen text-white sm:w-1/2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            {" "}
            Can non-students join E-Cell?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            No, E-Cell focuses exclusively on current student members passionate
            about entrepreneurship and innovation. If you&apos;re a student
            interested in joining, we&apos;d love to have you! Please{" "}
            <Link href="/contactus" className="underline">
              contact us
            </Link>
            for details on the application process.
          </AccordionContent>
        </AccordionItem>
        {/* 2 */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            {" "}
            What is the membership fee?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            The membership fee helps us organize events, provide resources, and
            support entrepreneurial activities. We keep it affordable to ensure
            broad participation.
          </AccordionContent>
        </AccordionItem>
        {/* 3 */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            What is the membership time frame?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            The membership is typically valid for one academic year, giving you
            full access to all events, workshops, and resources during that
            time.
          </AccordionContent>
        </AccordionItem>
        {/* 4 */}
        <AccordionItem value="item-4">
          <AccordionTrigger> Can I pay in cash or online?</AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            We offer multiple payment options for your convenience. You can pay
            the membership fee online via the application form or make a cash
            payment at our registeration desk near Ad Cell or E-Cell Room
            (Beside Veg Canteen).
          </AccordionContent>
        </AccordionItem>
        {/* 5 */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left text-sm">
            {" "}
            Can students from different branches/departments join E-Cell?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            Yes, E-Cell is open to students from all branches and departments.
            Entrepreneurship is a universal skill that can benefit everyone, and
            we encourage students from diverse backgrounds to join and
            contribute their unique perspectives.
          </AccordionContent>
        </AccordionItem>
        {/* 6 */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-left text-sm">
            {" "}
            I&apos;m a first-year student. Can I join E-Cell?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            Absolutely! First-year students are welcome and encouraged to join.
            Being part of E-Cell early in your academic journey can help you
            develop entrepreneurial skills, gain mentorship, and start building
            your network right from the start. It&apos;s a fantastic opportunity
            to get involved from day one.
          </AccordionContent>
        </AccordionItem>
        {/* 7 */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-left text-sm">
            {" "}
            How does E-Cell promote work-life balance for its members?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            We understand the importance of balancing academics and
            extracurricular activities. E-Cell&apos;s events are designed for
            flexibility, allowing you to participate without overwhelming your
            schedule. Spacing out events to fit your academic commitments.
          </AccordionContent>
        </AccordionItem>
        {/* 8 */}
        <AccordionItem value="item-8">
          <AccordionTrigger className="text-left">
            {" "}
            How do I sign up for membership?
          </AccordionTrigger>
          <AccordionContent className="text-left font-inter text-gray-400">
            Signing up is easy! Just click on Get Membership in this page or
            click{" "}
            <a className="underline" href="https://forms.gle/ePeDHzKgrb9MUGTx6">
              here.
            </a>
            Fill out a short form with your details. After submitting your
            application, make the payment to complete the process. You&apos;ll
            receive a confirmation email and you&apos;ll be able to join our
            whatsapp group.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
export default FaqComp;
