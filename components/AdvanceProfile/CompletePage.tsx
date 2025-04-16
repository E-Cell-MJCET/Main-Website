"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Header from "@/components/AdvanceProfile/Header";

import Loading from "./Loading";
import About from "./Core/About";
import Skills from "./Core/Skills";
import LicencesCertifications from "./Recommended/LicencesCertifications";
import Projects from "./Recommended/Projects";
import { Recommendations } from "./Recommended/Recommendations";
import Featured from "./Recommended/Featured";
import HonorsAwards from "./Additional/HonorsAwards";
import TestScores from "./Additional/TestScores";
import VolunteerExperience from "./Additional/VolunteerExperience";
import HistorySection from "./Education_Experience";
import Products from "./Core/Products";
import Causes from "./Additional/Causes";
import Services from "./Core/Services";

// Initialize Supabase client (replace with your actual Supabase URL and anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CompleteProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  console.log("username from params:", username); // Debugging Line

  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Initiating fetch for:", username);
        const { data, error } = await supabase
          .from("Team")
          .select("*")
          .eq("Username", username)
          .single();

        if (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching profile data");
        } else {
          setUserData(data);
        }
      } catch (err: any) {
        console.error(err);
        setError(
          `An error occurred while fetching profile data: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user found</div>;

  const skillsData = userData.Skills || {};

  return (
    <div className="w-screen overflow-x-hidden">
      <Header userData={userData} />
      {userData.About && (
        <About aboutText={userData.About} theme={userData.theme} />
      )}
      {(userData.Education?.length || userData.Experience?.length) > 0 && (
        <HistorySection
          educationData={userData.Education}
          experienceData={userData.Experience}
        />
      )}
      {skillsData && Object.keys(skillsData).length > 0 && (
        <Skills skills={skillsData} theme={userData.theme} />
      )}
      {(userData.Licenses?.length || userData.Certifications?.length) > 0 && (
        <LicencesCertifications
          licenses={userData.Licenses}
          certifications={userData.Certifications}
          theme={userData.theme}
        />
      )}
      {userData.Projects?.length > 0 && (
        <Projects projects={userData.Projects} theme={userData.theme} />
      )}
      {userData.Testimonials?.length > 0 && (
        <Recommendations
          recommendations={userData.Testimonials}
          theme={userData.theme}
        />
      )}
      {userData.Featured?.length > 0 && (
        <Featured featuredItems={userData.Featured} theme={userData.theme} />
      )}
      {(userData.Honors?.length || userData.Awards?.length) > 0 && (
        <HonorsAwards
          honors={userData.Honors}
          awards={userData.Awards}
          theme={userData.theme}
        />
      )}
      {userData.TestScores?.length > 0 && (
        <TestScores testScores={userData.TestScores} theme={userData.theme} />
      )}
      {userData.VolunteerExperience?.length > 0 && (
        <VolunteerExperience
          volunteerExperiences={userData.VolunteerExperience}
          theme={userData.theme}
        />
      )}
      {userData.Products?.length > 0 && (
        <Products products={userData.Products} theme={userData.theme} />
      )}
      {userData.Services?.length > 0 && (
        <Services services={userData.Services} theme={userData.theme} />
      )}
      {console.log("Causes is coming in here is ", userData.Causes)}
      {userData.Causes?.length > 0 && (
        <Causes causes={userData.Causes} theme={userData.theme} />
      )}
    </div>
  );
}
