"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import Header from '@/components/AdvanceProfile/Header';

import AdvExperience from './Experience';
import AdvEducation from './Education';
import Header2 from './H2';

// Initialize Supabase client (make sure to replace with your actual Supabase URL and anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CompleteProfilePage({ params }: { params: { username: string } }) {
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
          .from('Team') // Assuming the table name is 'Team'
          .select('*')
          .eq('Username', username) // Querying by username in the 'Name' column
          .single(); // Expecting a single row

        if (error) {
          console.log("Error is :-> ",error)
          setError('Error fetching profile data');
        } else {
          setUserData(data);
        }
      } catch (err: any) {
        console.log(err);
        setError(`An error occurred while fetching profile data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!userData) return <div>No user found</div>;
  console.log(userData)

return (
  <div className="flex flex-col items-center">
    <Header2
        name={userData.Name}
        Location={userData.Location}
        member_Type={userData.Member_Type}
        Personal_url={userData.Personal_url}
        Tagline={userData.Tagline}
        contact_info={userData.Contact_Info}
    />
    <br />
    <Header
        name={userData.Name}
        Location={userData.Location}
        member_Type={userData.Member_Type}
        Personal_url={userData.Personal_url}
        Tagline={userData.Tagline}
        contact_info={userData.Contact_Info}
        />
    <br />
    <br />
    <AdvExperience experienceData={userData.Experience!} />
    <br />
    <AdvEducation educationData={userData.Education!} />
    <br />
  </div>
      
);
}
