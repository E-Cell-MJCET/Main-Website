"use client";
import { useEffect, useState } from "react";

import { Achievement, Projects } from "@/types/UserTypes";

import ExperienceSection from "./ExperienceSection";
import AboutSection from "./AboutSection";
import EducationSection from "./EducationSection";
import LeftSection from "./LeftSection";
import AchievementSection from "./Achievements";

// Interfaces for data structure
interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  description: string;
}

interface UserType {
  roll_no: string;
  created_at: any;
  name: string;
  email: string;
  phone_no: number;
  experience: Experience[];
  about: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  achievements: Achievement[];
  portfolio: string;
  position: string;
  projects: Projects[];
  dob: any;
  image: string;
  theme: string;
  education: Education[];
  branch: string;
  year: number;
  slur: string;
}

function CompletePage({ userData }: { userData: UserType }) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    console.log("user data complete page: ", userData);
    if (userData) {
      setUser(userData);
    } else {
      console.error("user not found");
    }
  }, [userData]);

  return (
    <div>
      {!user ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen bg-black py-40 text-white">
          <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-3">
            {/* Left Section */}
            <LeftSection user={user} />
            {/* Right Section */}
            <div className="col-span-1 space-y-6 md:col-span-2">
              {/* About Section */}
              <AboutSection user={user} />
              <ExperienceSection experiences={user?.experience} />
              <EducationSection user={user?.education} />
              <AchievementSection user={user?.achievements} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletePage;
