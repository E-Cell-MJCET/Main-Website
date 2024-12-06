"use client";
//waste
import { useMouse } from "./use-mouse";

export default function FollowCursorHideCursor() {
  const [mouse, parentRef] = useMouse();

  const translate3d = `translate3d(${mouse.elementX}px, ${mouse.elementY}px, 0)`;

  return (
    <div
      className="absolute z-0 h-full max-w-full cursor-none overflow-hidden"
      ref={parentRef}
    >
      <div
        className="pointer-events-none absolute -left-3 -top-3 size-6 rounded-full border border-neutral-500/20 bg-neutral-500/15"
        style={{
          transform: translate3d,
        }}
      />
    </div>
  );
}
