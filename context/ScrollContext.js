"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const SmoothScrollerContext = createContext(null);

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function ScrollContext({ children }) {
  const [lenisRef, setLenisRef] = useState(null);
  const [setRefState] = useState(null);

  useEffect(() => {
    const scroller = new Lenis();

    let rf;

    function raf(time) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);

    setLenisRef(rf);
    setRefState(scroller);

    return () => {
      if (lenisRef) {
        cancelAnimationFrame(rf);
      }
    };
  }, []);

  return (
    <SmoothScrollerContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollerContext.Provider>
  );
}
