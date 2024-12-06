"use client";

import React from "react";

import Footer from "@/components/home/footer";
import Footers from "@/components/home/footer2";
import Nav from "@/components/nav";
import { UserType } from "@/types/UserTypes";

import CompletePage from "../../../components/profile/profile-page";

const userData: UserType = {
  roll_no: "12345",
  created_at: new Date(),
  name: "Nazmeen Sultana",
  email: "nazmeensultana666@gmail.com",
  phone_no: +919989940091,
  experience: [
    {
      id: "1",
      jobTitle: "Co-Founder",
      company: "Halcyon",
      startDate: "November 2023",
      endDate: "Present",
      description:
        "Co-founded an innovative mental health care app, leveraging AI-driven therapy tools and strategic partnerships to make mental health resources accessible, personalized, and stigma-free.",
    },
    {
      id: "1",
      jobTitle: "CFIxHacktober Fest Winner",
      company: "Halcyon",
      startDate: "",
      endDate: "October 2023",
      description:
        "Awarded for outstanding contributions and innovative solutions. Built beautiful user-interfaces using XML language in Android Studio.",
    },
    {
      id: "2",
      jobTitle: "Editorial & Research Team Head",
      company: "E-Cell MJCET",
      startDate: "October 2024",
      endDate: "Present",
      description:
        "Led the Editorial & Research Team, overseeing content creation, conducting in-depth analyses, and ensuring high-quality deliverables aligned with organizational goals.",
    },
    {
      id: "3",
      jobTitle: "Head of Planning Committee",
      company: "Manzar 2019",
      startDate: "",
      endDate: "2019",
      description:
        "Led student body, organized events, and represented the school in various capacities.",
    },

    {
      id: "4",
      jobTitle: "",
      company: "Quiz Master and Experienced Speaker",
      startDate: "",
      endDate: "2023",
      description:
        "Hosted a quiz event, showcasing strong knowledge and quick thinking. Delivered engaging and impactful speeches at various events, demonstrating excellent public speaking and communication skills.",
    },
  ],
  about:
    "A creative problem-solver with a passion for leadership, collaboration, and innovation. Skilled in organizing events, effective communication, and building meaningful connections. Combines technical expertise with interpersonal skills to embrace challenges and create lasting impact.",
  social: {
    github: "https://github.com/nazzmeen",
    linkedin: "https://www.linkedin.com/in/nazmeen-sultana-3ab662252/",
    instagram: "https://www.instagram.com/n4xmeen._/",
  },
  portfolio: "Editorial & Research",
  position: "Execom",
  dob: new Date("2004-08-29"),
  image: "/assets/GB/nazmeen.jpg",
  theme: "dark",
  education: [
    {
      id: "1",
      degree: "Intermediate",
      school: "St. Ann's College for Women, MPC",
      year: "",
      description: "2020-2022",
    },
    {
      id: "2",
      degree: "Bachelors in Artificial Intelligence & Data Science",
      school: "Muffakam Jah College of Engineering and Technology",
      year: "2022-2026",
      description: "2022-2026",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Captain of the Debate Team",
      description:
        "Participated in debate competitions and led my team to victory various times.",
    },
    {
      id: "2",
      title: "Cultural Club Member",
      description:
        "Actively participated in cultural club activities and events.",
    },
    {
      id: "3",
      title: "Fundraising Coordinator",
      description: "Managed budgets and secured sponsorships.",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Note Sync",
      description:
        "Developing a note-making website using ReactJS.Contributing to the development of a Stealth Project involving mobile app development.",
      year: "2023",
    },
    {
      id: "2",
      title: "Know Money",
      description:
        "Developed a UPI app with innovative features to help users save money, track spending, and effectively reduce expenses through smart financial insights.",
      year: "2023",
    },
  ],
  branch: "AI&DS",
  year: 3,
  slur: "nazmeen",
};

const NazmeenPage = () => {
  return (
    <div>
      <Nav />
      <CompletePage userData={userData} />
      <Footer />
      <Footers />
    </div>
  );
};

export default NazmeenPage;
