/* eslint-disable no-unused-vars */
"use client";
import React,{useState,useEffect} from 'react'
import { useUser } from '@clerk/nextjs'

import { supabase } from '@/utils/supabase'

function ProfileDashboard() {
    const { user, isLoaded: isClerkLoaded } = useUser();
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Fetch user data from Supabase based on the clerkID
      useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("Initiating fetch for: ", user!.id); // Debugging line
            const { data, error } = await supabase
              .from("Team") // Assuming the table name is 'Team'
              .select("*")
              .eq("clerk_user_id", user!.id) 
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
      }, [user]);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Below is the Data we store about you</h1>
      <br />
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  )
}

export default ProfileDashboard
