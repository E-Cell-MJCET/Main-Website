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
// import Services from './Core/Services';
import Causes from "./Additional/Causes";
import Services from "./Core/Services";

// Initialize Supabase client (make sure to replace with your actual Supabase URL and anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CompleteProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  console.log("username from params:", username); // Debugging Line, successfully fetched the username

  // State to hold the fetched data
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from Supabase based on the username
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Initiating fetch for: ", username); // Debugging line
        const { data, error } = await supabase
          .from("Team") // Assuming the table name is 'Team'
          .select("*")
          .eq("Username", username) // Querying by username in the 'Name' column
          .single(); // Expecting a single row

        if (error) {
          console.log("Error is :-> ", error);
          setError("Error fetching profile data");
        } else {
          setUserData(data);
        }
      } catch (err: any) {
        console.log(err);
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
  console.log(userData);

  const skillsData = userData.Skills || {}; // Ensure it's not undefined or null

  return (
    <div className="w-screen overflow-x-hidden">
      <Header userData={userData} />
      <About aboutText={userData.About} theme={userData.theme} />
      <HistorySection
        educationData={userData.Education!}
        experienceData={userData.Experience!}
      />
      <Skills skills={skillsData} theme={userData.theme} />
      {/* <Services
    services_info={userData.Services_Info}
    /> */}
      {/* <LicencesCertifications Licenses_info={{ licenses: userData.Licences, certifications: userData.Certifications }} /> */}
      <LicencesCertifications
        licenses={userData.Licenses}
        certifications={userData.Certifications}
        theme={userData.theme}
      />
      <Projects projects={userData.Projects} theme={userData.theme} />
      <Recommendations
        recommendations={userData.Testimonials}
        theme={userData.theme}
      />
      <Featured featuredItems={userData.Featured} theme={userData.theme} />
      <HonorsAwards
        honors={userData.Honors}
        awards={userData.Awards}
        theme={userData.theme}
      />
      <TestScores testScores={userData.TestScores} theme={userData.theme} />
      <VolunteerExperience
        volunteerExperiences={userData.VolunteerExperience}
        theme={userData.theme}
      />
      <Products products={userData.Products} theme={userData.theme} />
      <Services services={userData.Services} theme={userData.theme} />
      <Causes causes={userData.Causes} theme={userData.theme} />
    </div>
  );
}
