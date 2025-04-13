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
        target.tagName === "SPAN" ||
        target.tagName === "BUTTON"
      ) {
        scale.set(3);
        document.body.style.cursor = "none";
      } else {
        scale.set(1);
        document.body.style.cursor = "auto";
      }
    };

    const handleMouseLeave = () => {
      scale.set(1);
      document.body.style.cursor = "auto";
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      id="custom-cursor"
      className="fixed pointer-events-none w-4 h-4 bg-black dark:bg-white rounded-full
                mix-blend-difference z-50"
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