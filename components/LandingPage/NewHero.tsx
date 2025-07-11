// import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import team2 from "@/public/assets/team2.webp";
import execom2 from "@/public/assets/execomTH.webp";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950 ">
      <Hero />
    </div>
  );
};
const SECTION_HEIGHT = 1500;
const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full "
    >
      <CenterImage />
      {/* <div className="fixed inset-x-0 top-0 h-[400px] bg-gradient-to-b from-zinc-950 to-zinc-950/0 md:hidden" /> */}
      <ParallaxImages />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-10 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        src={team2}
        alt=""
        width={4000}
        height={4000}
        className="hidden size-full object-cover md:block"
        priority
      />
      <Image
        src={execom2}
        alt="execom"
        width={4000}
        height={4000}
        className=" size-full object-cover md:hidden"
        priority
      />
      {/* <video src="/assets/execom.mp4" autoPlay loop muted width={1000} height={1000} className="h-full w-screen" /> */}
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      {/* <ParallaxImg
        src="/assets/Logo/logo-big-colour.png"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      /> */}
      <ParallaxImg
        src="/assets/Logo/logo-big-white.png"
        alt="An example of a space launch"
        start={940}
        end={940}
        className="z-50 mx-auto hidden w-1/2 md:block"
      />
      <ParallaxImg
        src="/assets/Logo/logo-big-white.png"
        alt="An example of a space launch"
        start={940}
        end={610}
        className="z-50 mx-auto w-2/3 md:hidden"
      />
      {/* <ParallaxImg
        src="/assets/Logo/logo-big-colour.png"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      /> */}
      {/* <ParallaxImg
        src="/assets/Logo/logo-big-colour.png"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      /> */}
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className: any;
  alt: any;
  src: any;
  start: any;
  end: any;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <>
      <motion.img
        src={src}
        alt={alt}
        className={className}
        ref={ref}
        style={{ transform, opacity }}
      />
      {/* <motion.p ref={ref}>Ideate Inovate Incubate</motion.p> */}
    </>
  );
};
