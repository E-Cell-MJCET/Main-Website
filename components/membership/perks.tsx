"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useOutsideClick } from "@/hooks/use-outside-click";

export function Perks() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="bg-black">
      <h1 className="mb-8 text-center font-silkscreen text-4xl font-extrabold tracking-wide  text-[#f6e445]">
        Perks of Membership
      </h1>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 size-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex size-full  max-w-[500px] flex-col overflow-hidden  bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-t-lg lg:h-80"
                />
              </motion.div>
              <div>
                <div className="flex  flex-col items-start justify-between p-4 md:flex-row">
                  <div className="w-full md:w-auto">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-lg font-bold text-neutral-200 "
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-base text-neutral-200"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href="https://forms.gle/ePeDHzKgrb9MUGTx6"
                    target="_blank"
                    className="mt-4 w-[200px] rounded-full bg-blue-800 px-4 py-3 text-center text-sm font-bold text-white md:mt-0"
                  >
                    Become a Member!
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-400 [-webkit-overflow-scrolling:touch] md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full max-w-2xl gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-neutral-800 md:flex-row"
          >
            <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-start">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="shrink-0"
              >
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="size-24 rounded-lg object-cover object-top md:size-14"
                />
              </motion.div>
              <div className="grow text-center md:text-left">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-silkscreen font-medium text-neutral-200"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="mt-4 w-32 rounded-full bg-blue-800 px-4 py-3 text-xs font-bold text-white hover:bg-blue-800 hover:text-white md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Your Ticket To All Ecell Activities.",
    title: "Access To All Ecell Events",
    src: "/assets/membership/events.JPG",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          As a member of the E-Cell Tech Club, you gain exclusive access to a
          diverse range of exciting events designed to enhance your
          entrepreneurial journey and connect you with industry leaders.
          Participate in our flagship event, Game of Investors, where you can
          pitch your startup ideas to a panel of experienced investors and
          receive invaluable feedback. Join us for the Battle of Brands, a
          thrilling competition where teams strategize and showcase their
          marketing skills to outshine their competitors. Don&apos;t miss the
          highly anticipated IPL Auction, where participants simulate the
          excitement of an auction, learning negotiation and decision-making
          skills in a fast-paced environment. These events not only provide a
          platform to showcase your talents but also foster networking
          opportunities and real-world experience in the tech and
          entrepreneurship space.
        </p>
      );
    },
  },
  {
    description: "Unlock campus-driven startup acceleration.",
    title: "Access To Start Up Acceleration",
    src: "https://img.freepik.com/free-photo/startup_53876-95882.jpg?t=st=1729408615~exp=1729412215~hmac=0fa7296a3f994261264dc8262c935eb94ba0b53fb56ff2f56957c1721387ab8e&w=826",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          As an E-Cell member, you gain exclusive access to on-campus startup
          acceleration programs and our comprehensive Entrepreneurship Program,
          where we provide lessons on business planning, development, and growth
          strategies. These programs offer mentorship from experienced
          entrepreneurs, workshops, and potential funding opportunities,
          equipping you with the essential tools and knowledge to transform your
          ideas into successful ventures. Whether you&apos;re just starting out
          or ready to launch, E-Cell supports you every step of the way on your
          entrepreneurial journey.
        </p>
      );
    },
  },
  {
    description: "Join events hosted by MNCs",
    title: "Access events in major tech companies",
    src: "/assets/membership/infosys.png",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          As a member of E-Cell, you gain exclusive invitations to events hosted
          by some of the world&apos;s leading tech companies and multinational
          corporations (MNCs). Whether it&apos;s a networking mixer, a hands-on
          workshop, or an insider panel discussion, these events offer
          unparalleled opportunities to connect with industry leaders, learn
          about the latest innovations, and explore potential career paths. This
          perk gives you a unique chance to engage directly with experts.
        </p>
      );
    },
  },
  {
    description: "VIP access to top industry connections.",
    title: "Exclusive Networking Opportunities",
    src: "https://www.baass.com/hs-fs/hubfs/benefits-of-attending-networking-events-2.jpg?width=694&name=benefits-of-attending-networking-events-2.jpg",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          At E-Cell, we offer our members unparalleled access to a vast network
          of industry leaders, successful entrepreneurs, and experienced
          mentors. Through our exclusive networking events, members have the
          chance to connect directly with venture capitalists, startup founders,
          and tech innovators. Whether it&apos;s at our pitch nights, guest
          speaker sessions, or startup expos, these events provide invaluable
          opportunities to build relationships, gain insights, and explore
          potential collaborations. E-Cell ensures that every member is equipped
          not just with technical skills, but also with the connections they
          need to thrive in the entrepreneurial world.
        </p>
      );
    },
  },
  {
    description: "Your Tech Troubles, Solved Fast!",
    title: "Tech Help Desk",
    src: "https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?t=st=1729407792~exp=1729411392~hmac=8551b072526249b41d6c2d15b95045f198fed5e84bc200431abe49cdafea4793&w=826",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          At E-Cell, we understand that navigating the world of technology can
          be challenging. That&apos;s why we offer a dedicated Tech Help Desk
          staffed by our talented tech team, ready to assist you with any
          technical questions or issues you may encounter. Whether you need
          guidance on coding, app development, or troubleshooting tech-related
          problems, our team is here to provide personalised support and
          solutions. We believe that collaboration and assistance are key to
          fostering innovation, and our experienced members are eager to share
          their knowledge and expertise, ensuring you have the resources you
          need to succeed in your projects and entrepreneurial endeavours.
        </p>
      );
    },
  },
  {
    description: "Exclusive access to talks with innovators.",
    title: "Chats With Talented Entrepreneurs",
    src: "https://img.freepik.com/premium-photo/business-idea-man-buttoning-up_780608-2783.jpg?w=740",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          As an E-Cell member, you&apos;ll have the unique opportunity to engage
          in one-on-one or group discussions with accomplished entrepreneurs
          from various industries. These interactions can take the form of
          informal chats, Q&A sessions, or structured mentorship meetings. To
          further enrich your experience, we will arrange seminars featuring
          successful entrepreneurs who will share their insights and
          experiences. You&apos;ll gain invaluable knowledge about their
          journeys, the challenges they faced, and effective strategies for
          success. This is not just an opportunity to seek advice; it&apos;s a
          chance to build meaningful connections that can inspire and guide your
          own entrepreneurial path. Whether you&apos;re seeking guidance on
          starting your own venture or looking for inspiration, these
          conversations and seminars will provide a wealth of knowledge and
          motivation.
        </p>
      );
    },
  },
  {
    description: "Design a resume that shines.",
    title: "Resume Building",
    src: "https://img.freepik.com/free-photo/resume-application-employment-form-concept_53876-125148.jpg?t=st=1729408495~exp=1729412095~hmac=f1aa5b84be411c64ccaf6bc82a70131593c9ddc907b5f7b3008f34cc88867071&w=740",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          At E-Cell, we are committed to enhancing your professional journey in
          the tech world. Our club not only provides an engaging platform for
          learning and collaboration but also focuses on building your resume
          with valuable skills and experiences. Participate in our dynamic
          events, including the renowned Hack Revolution, where you can showcase
          your creativity and technical prowess in an intense hackathon
          environment. By joining E-Cell, you will receive certificates that
          validate your participation and achievements, giving your resume a
          competitive edge in the job market. Elevate your career prospects with
          us and become part of a thriving community of innovators and
          entrepreneurs!
        </p>
      );
    },
  },
  {
    description: "Cultivate soft skills to excel in any field.",
    title: "Soft Skills",
    src: "/assets/membership/soft-skills.webp",
    ctaText: "Know More",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Being a part of E-Cell doesn&apos;t just enhance your technical and
          business knowledge—it also focuses on building essential soft skills.
          Members will have access to workshops and mentorship sessions on
          leadership, communication, teamwork, time management, and
          problem-solving. These skills are invaluable in both entrepreneurial
          ventures and corporate careers, helping you become more adaptable,
          persuasive, and efficient in professional environments. By honing
          these skills, you&apos;ll be better.
        </p>
      );
    },
  },
];
