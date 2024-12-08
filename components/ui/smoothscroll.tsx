import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // smooth: true,
    });

    const onAnimationFrame = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(onAnimationFrame);
    };

    requestAnimationFrame(onAnimationFrame);

    return () => {
      // Clean up
      lenis.destroy();
    };
  }, []);

  return null; // If it's a utility hook, no JSX is needed
};

export default SmoothScroll;
