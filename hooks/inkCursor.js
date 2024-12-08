import React, { useRef, useEffect } from "react";

const useInkCursor = (parentRef) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);
  const paramsRef = useRef({
    pointsNumber: 40,
    widthFactor: 0.3,
    spring: 0.4,
    friction: 0.5,
  });

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const setCanvasSize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const rect = parent.getBoundingClientRect();
    pointerRef.current = {
      x: rect.width / 2,
      y: rect.height / 2,
    };

    trailRef.current = new Array(paramsRef.current.pointsNumber)
      .fill(null)
      .map(() => ({
        x: pointerRef.current.x,
        y: pointerRef.current.y,
        dx: 0,
        dy: 0,
      }));

    const updateMousePosition = (x, y) => {
      const rect = parent.getBoundingClientRect();
      pointerRef.current.x = Math.max(0, Math.min(x - rect.left, rect.width));
      pointerRef.current.y = Math.max(0, Math.min(y - rect.top, rect.height));
    };

    const handleMouseMove = (e) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const updateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, "white");
      ctx.strokeStyle = gradient;

      trailRef.current.forEach((p, i) => {
        const prev = i === 0 ? pointerRef.current : trailRef.current[i - 1];
        const spring =
          i === 0 ? 0.4 * paramsRef.current.spring : paramsRef.current.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= paramsRef.current.friction;
        p.dy *= paramsRef.current.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
      for (let i = 1; i < trailRef.current.length - 1; i++) {
        const xc = 0.5 * (trailRef.current[i].x + trailRef.current[i + 1].x);
        const yc = 0.5 * (trailRef.current[i].y + trailRef.current[i + 1].y);
        ctx.quadraticCurveTo(
          trailRef.current[i].x,
          trailRef.current[i].y,
          xc,
          yc
        );
        ctx.lineWidth =
          paramsRef.current.widthFactor * (paramsRef.current.pointsNumber - i);
        ctx.stroke();
      }
      ctx.lineTo(
        trailRef.current[trailRef.current.length - 1].x,
        trailRef.current[trailRef.current.length - 1].y
      );
      ctx.stroke();

      requestAnimationFrame(updateCanvas);
    };

    setCanvasSize();
    updateCanvas();

    parent.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", setCanvasSize);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [parentRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default useInkCursor;
