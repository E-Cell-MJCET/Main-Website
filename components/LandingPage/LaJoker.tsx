// import { ReactLenis } from "lenis/dist/lenis-react";

import Image from "next/image";

import team2 from "@/public/assets/team2.webp";
import execom2 from "@/public/assets/execomTH.webp";

export const LaJoker = () => {
  return (
    <div className="h-screen overflow-y-hidden bg-zinc-950">
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
    </div>
  );
};
const CenterImage = () => {
  const clipPath = "polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)"; // Static clip path
  const backgroundSize = "100%";
  const opacity = 1;

  return (
    <div
      className="sticky top-24 h-screen w-full overflow-y-hidden md:top-10 md:overflow-auto"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        src={team2} // Replace with actual path
        alt=""
        width={4000}
        height={4000}
        className="hidden size-full object-cover md:block"
        priority
      />
      <Image
        src={execom2} // Replace with actual path
        alt="execom"
        width={4000}
        height={4000}
        className="size-full overflow-hidden object-cover md:hidden"
        priority
      />
      {/* Uncomment if you want a video instead */}
      {/* <video src="/assets/execom.mp4" autoPlay loop muted width={1000} height={1000} className="h-full w-screen" /> */}
    </div>
  );
};

export default CenterImage;
