"use client";
import React, { useCallback, useEffect } from "react";

type ProgressbarProps = {
  current: any;
  targert: React.RefObject<HTMLDivElement>;
};
const ProgressBar = ({ target }: { target: ProgressbarProps }) => {
  const [readingProgres, setReadingProgress] = React.useState(0);

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return;
    }
    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  }, [target]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 w-screen"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="h-2 bg-gradient-to-r from-red-400 to-blue-600"
        style={{
          width: `${readingProgres}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
