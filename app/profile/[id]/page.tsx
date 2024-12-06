import { supabase } from "@/utils/supabase";
import { UserType } from "@/types/UserTypes";
// import CompletePage from "../components/Complete-Page";
import CompletePage from "@/components/profile/profile-page";

export const runtime = "edge";
// Function to fetch user data from Supabase based on user ID
const fetchUserData = async (id: string) => {
  const { data, error } = await supabase
    .from("members") // Replace with your actual table name (e.g., 'users')
    .select("*") // Adjust the fields you need
    .eq("slur", id)
    .single(); // Assuming 'id' is unique, fetch a single record

  console.log("data found ", data);

  if (error) {
    console.error("Error fetching user data:", error);

    return null;
  }

  return data;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Destructure 'id' from the params

  // Fetch user data
  const userData: UserType = await fetchUserData(id);

  if (!userData) {
    // Handle case where no user data is found
    return <div>Error: User data not found.</div>;
  }

  // Pass the user data as props to CompletePage
  return <CompletePage userData={userData} />;
}
