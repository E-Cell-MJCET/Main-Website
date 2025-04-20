import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { toast } from "sonner";

import { Team } from "@/types/TeamTypes";
import { supabase } from "@/utils/supabase";

const resgiterNewTeam = async (teamData: Team) => {
  const abstract_url = await uploadAbstract(teamData.abstract, teamData.email);
  await sendTeamLeaderData(teamData);
  await sendTeamDataSupabase(teamData, abstract_url);
};

const uploadAbstract = async (file: File, email: string) => {
  try {
    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID_ECELL!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ID_ECELL!,
      },
    });

    const encodedKey = file.name.replace(/\s+/g, "");

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket: "hackcelerate",
      Key: `abstracts/${email}/${encodedKey}`,
      Body: buffer, // Use buffer instead of file directly
      ContentType: file.type,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const s3Link = `https://${uploadParams.Bucket}.s3.amazonaws.com/${encodeURIComponent(
      uploadParams.Key
    )}`;
    console.log("File uploaded successfully:", s3Link);

    return s3Link;
  } catch (error) {
    toast.error("Error uploading abstract: " + error);
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

const sendTeamDataSupabase = async (teamData: Team, abstract_url: string) => {
  try {
    const { data, error } = await supabase.from("hackcelerate").insert([
      {
        team_name: teamData.team_name,
        no_of_participants: teamData.no_of_participants,
        team_leader_name: teamData.team_leader_name,
        college: teamData.college,
        branch: teamData.branch,
        year: teamData.year,
        roll_no: teamData.roll_no,
        phone_no: teamData.phone_no,
        email: teamData.email,

        tm1_name: teamData.team_members?.[0]?.name || null,
        tm1_rollno: teamData.team_members?.[0]?.roll_no || null,
        tm1_college: teamData.team_members?.[0]?.college || null,
        tm1_email: teamData.team_members?.[0]?.email || null,
        tm1_phoneno: teamData.team_members?.[0]?.phone_no || null,

        tm2_name: teamData.team_members?.[1]?.name || null,
        tm2_rollno: teamData.team_members?.[1]?.roll_no || null,
        tm2_college: teamData.team_members?.[1]?.college || null,
        tm2_email: teamData.team_members?.[1]?.email || null,
        tm2_phoneno: teamData.team_members?.[1]?.phone_no || null,

        tm3_name: teamData.team_members?.[2]?.name || null,
        tm3_rollno: teamData.team_members?.[2]?.roll_no || null,
        tm3_college: teamData.team_members?.[2]?.college || null,
        tm3_email: teamData.team_members?.[2]?.email || null,
        tm3_phoneno: teamData.team_members?.[2]?.phone_no || null,

        tm4_name: teamData.team_members?.[3]?.name || null,
        tm4_rollno: teamData.team_members?.[3]?.roll_no || null,
        tm4_college: teamData.team_members?.[3]?.college || null,
        tm4_email: teamData.team_members?.[3]?.email || null,
        tm4_phoneno: teamData.team_members?.[3]?.phone_no || null,

        tm5_name: teamData.team_members?.[4]?.name || null,
        tm5_rollno: teamData.team_members?.[4]?.roll_no || null,
        tm5_college: teamData.team_members?.[4]?.college || null,
        tm5_email: teamData.team_members?.[4]?.email || null,
        tm5_phoneno: teamData.team_members?.[4]?.phone_no || null,

        abstract: abstract_url,
        email_verified: teamData.email_verified,
        team_type: teamData.team_type,
      },
    ]);
    console.log("Data inserted successfully:", data);
    if (error) {
      console.error("Error inserting data:", error);
      toast.error("Error inserting data: " + error.message);
      throw error;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

const sendTeamLeaderData = async (teamData: Team) => {
  try {
    const { data, error } = await supabase.from("hackcelerate_leader").insert([
      {
        team_name: teamData.team_name,
        name: teamData.team_leader_name,
        roll_no: teamData.roll_no,
        phone_no: teamData.phone_no,
        college: teamData.college,
        branch: teamData.branch,
        year: teamData.year,
        email: teamData.email,
        team_type: teamData.team_type,
      },
    ]);
    if (error) {
      console.error("Error inserting team leader data:", error);
      toast.error("Error inserting team leader data: " + error.message);
      throw error;
    }
    console.log("Team leader data inserted successfully:", data);
  } catch (error) {
    console.error("Error inserting team leader data:", error);
    throw error;
  }
};

export default resgiterNewTeam;
