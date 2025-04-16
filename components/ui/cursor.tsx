"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const springConfig = { damping: 20, stiffness: 200, mass: 1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "P" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "A" ||
        // target.tagName === "SPAN" ||
        target.tagName === "BUTTON" ||
        target.id === "github"
      ) {
        scale.set(3);
      } else if (target.tagName === "H6") {
        scale.set(7);
      } else if (target.id === "LOGO") {
        scale.set(4);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      id="custom-cursor"
      className="pointer-events-none fixed z-[9999] size-4 rounded-full bg-white mix-blend-difference"
      style={{
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale,
      }}
    />
  );
}
