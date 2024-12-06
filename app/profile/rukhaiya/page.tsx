"use client";

import React from "react";

import { UserType } from "@/types/UserTypes";
import CompletePage from "@/components/profile/profile-page";

const userData: UserType = {
  roll_no: "1604-22-733-063",
  created_at: new Date(),
  name: "Rukhaiya Begum",
  email: "rukhaiyams@gmail.com",
  phone_no: 9014934625,
  experience: [
    {
      id: "1",
      jobTitle: "Editorial and Research Head",
      company: "E-Cell MJCET",
      startDate: "October 2024",
      endDate: "Present",
      description:
        "At the helm of ideas and innovation, I lead as the Editorial and Research Head, curating impactful narratives and uncovering transformative insights. With a keen eye for detail and a passion for exploration, I bridge creativity and knowledge to deliver compelling content and strategic research that inspires action and drives results.",
    },
    {
      id: "2",
      jobTitle: "Event Speaker",
      company: "E-Cell MJCET",
      startDate: "",
      endDate: "2024",
      description:
        "Know how to engage audiences with insightful presentations, sharing knowledge, sparking discussions, and inspiring action on key topics to create meaningful experiences.",
    },
    {
      id: "3",
      jobTitle: "Research assistant",
      company: "",
      startDate: "",
      endDate: "2019",
      description:
        "I supported innovative projects by conducting thorough research, analyzing data, and contributing insights that drive discovery and progress in the field.",
    },
  ],
  about:
    "A resourceful and results-driven individual with a keen interest in leadership, innovation, and teamwork. Skilled in event coordination, communicating effectively, and delivering innovative solutions. An avid reader and adventure enthusiast, I draw inspiration from novels and real-world experiences.",
  social: {
    github: "https://github.com/rukhaiya08",
    linkedin: "https://www.linkedin.com/in/rukhaiya-begum-246648340/",
    instagram: "https://www.instagram.com/rukhaiyaaa._/",
  },
  portfolio: "Editorial & Research",
  position: "Execom",
  dob: new Date("2005-03-11"),
  image:
    "http://localhost:3000/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.jpg",
  theme: "dark",
  education: [
    {
      id: "1",
      degree: "Intermediate",
      school: "MS junior college",
      year: "",
      description: "2020-2022",
    },
    {
      id: "2",
      degree: "Bachelors in Computer Science Engineering",
      school: "Muffakam Jah College of Engineering and Technology",
      year: "2022-2026",
      description: "2022-2026",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Sports secretary",
      description:
        "As Sports Secretary, I promote teamwork, organize events, and inspire passion for athletics, fostering a vibrant and inclusive sports community.",
    },
    {
      id: "2",
      title: "Public Speaker",
      description:
        "A passionate member of the debate team, competing in inter school level competitions, enhancing my communication and persuasive skills.",
    },
    {
      id: "3",
      title: "Creative Writing",
      description:
        "Contributed articles and stories to the college magazine, honing my writing skills while engaging with a wider audience.",
    },
  ],
  projects: [],
  branch: "CSI",
  year: 3,
  slur: "rukhaiya",
};

const RukhaiyaPage = () => {
  return (
    <div>
      <CompletePage userData={userData} />
    </div>
  );
};

export default RukhaiyaPage;
