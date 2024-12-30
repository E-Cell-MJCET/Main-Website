"use client";
import React from "react";

import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Abid Nafi",
    designation: "/team",
    image: "/assets/Team/GB/abid.png",
  },
  {
    id: 2,
    name: "Syed Abdul Muneeb",
    designation: "/team",
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
  },
  {
    id: 3,
    name: "Neha Anjum",
    designation: "/team",
    image: "/assets/Team/Execom/Technical/Neha/Neha.jpg",
  },
  {
    id: 4,
    name: "Syed Adnan Ali",
    designation: "/team",
    image: "/assets/Team/Execom/Technical/Adnan/Adnan.jpg",
  },
  {
    id: 5,
    name: "Syed Aayan",
    designation: "/team",
    image: "/assets/Team/Execom/Technical/Aayan/Aayan.jpg",
  },
  {
    id: 6,
    name: "Maliha Ishaq",
    designation: "/team",
    image: "/assets/Team/GB/maliha.jpeg",
  },
];

export function TeamToolTip() {
  return (
    <div className="flex flex-row items-center justify-center">
      <AnimatedTooltip items={people} />
    </div>
  );
}
