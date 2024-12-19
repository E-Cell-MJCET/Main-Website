/* eslint-disable tailwindcss/no-contradicting-classname */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";

// import team from "@/public/assets/team3.png"

const projects = [
  {
    title: "E-Cell MJCET",
    description:
      "E-Cell MJCET is a vibrant community of young innovators and entrepreneurs aiming to bridge the gap between academics and industry. We foster a culture of innovation and creativity, transforming ideas into impactful realities.",
    src: "/assets/team2.jpeg", // Add this image to your project folder
    link: "https://example.com/ecell-mjcet",
    color: "bg-purple-900",
  },
  {
    title: "Entrepreneurship Program",
    description:
      "The Entrepreneurship Program aims to inspire creativity and equip participants with the skills to turn innovative ideas into impactful ventures. Through engaging activities, workshops, and mentorship, the program helps participants refine their ideas, develop strategies, and accelerate their journey toward building successful startups.",
    src: "/assets/EP.png", // Add this image to your project folder
    link: "https://example.com/workshops",
    color: "bg-orange-600",
  },
  {
    title: "Hackathons",
    description:
      "Our hackathons provide a platform for students to solve real-world problems with innovative solutions, fostering teamwork and technical excellence.",
    src: "/assets/hackathon1.jpeg", // Add this image to your project folder
    link: "https://hackrevolution.in",
    color: "bg-blue-500",
  },
  {
    title: "Industrial Trip",
    description:
      "Our Industrial Trip offers students a unique opportunity to explore real-world business environments and gain hands-on insights into various industries. This immersive experience connects students with professionals, enhances their understanding of industry practices, and inspires innovative thinking for future entrepreneurial endeavors",
    src: "/assets/trip.jpeg",
    link: "https://example.com/industrial-trip",
    color: "bg-gray-800",
  },
  {
    title: "Become a Member",
    description:
      "Our innovation challenges encourage participants to devise creative solutions to pressing problems, pushing the boundaries of what is possible.",
    src: "/assets/Logo/logo-big-white.png", // Add this image to your project folder
    link: "/membership",
    color: "bg-zinc-950 ",
    ecell: true,
  },
];

function AboutUs(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="grid  h-[70vh]  w-full place-content-center  bg-slate-950 text-white ">
          <div className="absolute inset-0 "></div>
          <h1 className="px-8 text-center text-5xl font-semibold leading-[120%] tracking-tight 2xl:text-7xl">
            We are Ecell <br />{" "}
          </h1>
        </section>
        <section className="w-full   bg-slate-950 text-white  ">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;

            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                ecell={project?.ecell}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
interface CardProps {
  i: number;
  title: string;
  description: string;
  src: any;
  ecell?: boolean;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  ecell,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={` ${color} relative -top-1/4 flex h-[450px] w-[70%] origin-top flex-col rounded-md p-10`}
      >
        <h2 className="text-center  text-2xl font-semibold">{title}</h2>
        <div className={`mt-5 flex h-full gap-10`}>
          <div className={`relative top-[10%] w-2/5`}>
            <p className="text-base">{description}</p>
            <span className="flex items-center gap-2 pt-2">
              <a
                href={url}
                target="_blank"
                className="cursor-pointer underline"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div className={`relative h-full  w-3/5 overflow-hidden rounded-lg `}>
            <motion.div className={`size-full`} style={{ scale: imageScale }}>
              <Image
                fill
                src={src}
                alt="image"
                className={`${ecell ? "object-contain" : "object-cover"}`}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
