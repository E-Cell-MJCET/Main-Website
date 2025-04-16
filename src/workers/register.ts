import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

    const uploadParams = {
      Bucket: "hackcelerate",
      Key: `abstracts/${email}/${encodedKey}`,
      Body: file,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const s3Link = `https://${
      uploadParams.Bucket
    }.s3.amazonaws.com/${encodeURIComponent(uploadParams.Key)}`;

    return s3Link;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

const sendTeamDataSupabase = async (teamData: Team, abstract_url: string) => {
  try {
    const { data } = await supabase.from("hackcelerate").insert([
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
        team_members: JSON.stringify(teamData.team_members),
        abstract: abstract_url,
        email_verified: true,
      },
    ]);
    console.log("Data inserted successfully:", data);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

const sendTeamLeaderData = async (teamData: Team) => {
  try {
    const { data } = await supabase.from("hackcelerate_leader").insert([
      {
        team_name: teamData.team_name,
        name: teamData.team_leader_name,
        roll_no: teamData.roll_no,
        phone_no: teamData.phone_no,
        college: teamData.college,
        branch: teamData.branch,
        year: teamData.year,
        email: teamData.email,
      },
    ]);
    console.log("Team leader data inserted successfully:", data);
  } catch (error) {
    console.error("Error inserting team leader data:", error);
    throw error;
  }
};

export default resgiterNewTeam;
