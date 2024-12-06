"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

import team1 from "@/public/assets/team1.png";
import team3 from "@/public/assets/team3.png";
import team4 from "@/public/assets/dean.jpeg";
import team5 from "@/public/assets/team5.jpg";
import team6 from "@/public/assets/team6.png";
import team2 from "@/public/assets/team2.jpeg";
import { cn } from "@/lib/utils";

interface Props {
  classes?: string;
}

const ZoomParallax: FC<Props> = ({ classes }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: team2,
      scale: scale1,
      classes: "relative w-[25%] h-[25%]",
    },
    {
      src: team6,
      scale: scale2,
      classes: "relative top-[-30%] left-[5%] w-[35%] h-[30%]",
    },
    {
      src: team3,
      scale: scale3,
      classes: "relative top-[-29%] left-[-25%] w-[20%] h-[28%]",
    },
    {
      src: team4,
      scale: scale2,
      classes: "relative left-[27.5%] w-[25%] h-[25%]",
    },
    {
      src: team5,
      scale: scale3,
      classes: "relative left-[-27.5%] w-[25%] h-[25%]",
    },
    {
      src: team1,
      scale: scale4,
      classes: "relative top-[27.5%] left-[5%] w-[20%] h-[25%]",
    },
    {
      src: team2,
      scale: scale5,
      classes: "relative top-[22.5%] left-[25%] w-[15%] h-[15%]",
    },
  ];

  return (
    <section
      ref={container}
      className={cn("relative h-[130vh] w-full", classes)}
    >
      <div className="sticky top-0 h-[210vh] overflow-hidden">
        {pictures.map(({ src, scale, classes }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 flex size-full items-center justify-center"
            >
              <div className={`bg-zinc-200 dark:bg-zinc-800 ${classes}`}>
                <Image
                  src={src}
                  fill
                  objectFit="cover"
                  alt="image of beautiful person"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ZoomParallax;
