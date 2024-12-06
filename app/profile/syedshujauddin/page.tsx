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
  name: "Syed Shujauddin",
  email: "nazmeensultana666@gmail.com",
  phone_no: +919989940091,
  experience: [
    {
      id: "1",
      jobTitle: "Chief Coordinator",
      company: "Entrepreneurship Cell, MJCET",
      startDate: "Aug 2024 – Present (4 mos)",
      endDate: "Present",
      description:
        " Leading and fostering a culture of creativity, collaboration, and entrepreneurship within the organization",
    },
    {
      id: "2",
      jobTitle: "Deputy Chief Coordinator",
      company: "Entrepreneurship Cell, MJCET",
      startDate: " Jul 2023",
      endDate: " Aug 2024 (1 yr 2 mos)",
      description:
        "Assisted in strategic planning, event coordination, and operational management to promote entrepreneurial initiatives.",
    },
    {
      id: "3",
      jobTitle: "Graphics Team Member",
      company: "Entrepreneurship Cell, MJCET",
      startDate: " Oct 2022",
      endDate: "Jul 2023 (10 mos)",
      description:
        "Contributed to designing promotional material and enhancing the visual identity of the cell.",
    },
    {
      id: "4",
      jobTitle: "LOC Member, Intercontinental Cup 2024",
      company: "All India Football Federation",
      startDate: "Sep 2024 (1 mo)",
      endDate: "",
      description:
        " Played a key role in organizing and managing operations for the Intercontinental Cup 2024 held in Hyderabad.",
    },

    {
      id: "5",
      jobTitle: "Operations & Competitions Coordinator",
      company: "Hyderabad FC",
      startDate: "Sep 2023",
      endDate: "May 2024 (9 mos) ",
      description:
        " Coordinated operations and competitions, ensuring seamless event execution and team management.",
    },

    {
        id: "6",
        jobTitle: "Operations Volunteer",
        company: "Hyderabad FC",
        startDate: "Nov 2022",
        endDate: "Aug 2023 (10 mos)",
        description:
          "Supported various operational tasks, contributing to event success and organizational efficiency.",
      },
  ],
  about:
    "I am a fourth-year Computer Science Engineering student driven by a passion for innovation, leadership, and continuous growth. Over the years, I have embraced challenges as opportunities to refine my skills, solve real-world problems, and create impactful solutions emphasizing simplicity, efficiency, and innovation. As the Chief Coordinator of the E-Cell at MJCET, I foster creativity and collaboration while balancing my commitment to football, having served as an AIFF LOC member for international tournaments. My experience with Hyderabad FC’s operations team further honed my ability to manage responsibilities effectively. Guided by resilience, curiosity, and a desire to leave a lasting impact, I strive to break boundaries and build legacies.",
  social: {
    linkedin: "https://www.linkedin.com/in/syedshujauddin/",
  },
  portfolio: "Chief Coordinator",
  position: "Governing Body",
  dob: new Date("2004-08-29"),
  image: "/assets/GB/shuja.jpeg",
  theme: "dark",
  education: [
    {
      id: "1",
      degree: "School",
      school: "International Indian Public School",
      year: "",
      description: "2007-2017",
    },
    {
      id: "2",
      degree: "School",
      school: "Madina Public School",
      year: "",
      description: "2017-2019",
    },
    {
      id: "3",
      degree: "Intermediate",
      school: "Sri Chaitanya College of Education",
      year: "2022-2026",
      description: "2019-2021",
    },
    {
      id: "4",
      degree: "Bachelors in Computer Science & Engineering",
      school: "Muffakham Jah College of Engineering & Technology",
      year: "2021-2025",
      description: "2021-2025",
    },

  ],
  achievements: [
    {
      id: "1",
      title: "2nd Place Hack4SG",
      description:
        "",
    },
    {
      id: "2",
      title: "1st Place HackRevolution",
      description:
        "",
    },
  ],
  projects: [
    {
      id: "1",
      title: "ACRS (Anonymous Corruption Reporting System)",
      description:
        "- Developed a decentralized and secure corruption reporting platform leveraging Blockchain, AI, and NFTs to ensure transparency, data integrity, and whistleblower privacy in alignment with *SDG 16: Peace, Justice, and Strong Institutions. Implemented AI-driven analytics to monitor real-time corruption reports, identify suspicious patterns, and predict risks while safeguarding sensitive government transactions with cryptographic seals. - Introduced a Decentralized Citizen Tribunal using blockchain-based algorithms, enabling impartial citizen oversight to enhance accountability and public trust in governance.",
      year: "",
    },
    {
      id: "2",
      title: "Munch Alert",
      description:
        "Created, Munch Alert an allergy shopping assistant app that helps users find allergen-free products, earning recognition as the winner of *Hack Revolution 2023*. Contributed to front-end development and pitched the app to a panel of judges at a hackathon with over 400 participants.Designed the mobile application to support individuals with food allergies in their daily lives, providing a user-friendly solution for grocery shopping.",
      year:"",
    },
    {
      id: "3",
      title: "WhatsApp Chat Analyzer",
      description:
        "Developed a decision tree classification model using Gini Index and Entropy, achieving high prediction accuracy.Processed and split data to train and test the model for optimal performance.Utilized Python and Scikit-learn for model evaluation, including the creation of a confusion matrix and accuracy score analysis.",
      year:"",
    },
  ],
  branch: "CSE",
  year: 4,
  slur: "Syed Shujauddin",
};

const ShujaPage = () => {
  return (
    <div>
      <Nav />
      <CompletePage userData={userData} />
      <Footer />
      <Footers />
    </div>
  );
};

export default ShujaPage;