/* eslint-disable no-unused-vars */
import { Metadata } from "next";
import type { ReactNode } from "react";

import { supabase } from "@/utils/supabase";

// This function will generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const username = params.username;

  // Fetch user data
  let userData = null;
  try {
    const { data, error } = await supabase
      .from("Team")
      .select("*")
      .eq("Username", username)
      .single();

    if (!error) {
      userData = data;
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
  }

  // Generate dynamic metadata based on fetched user data
  const name = userData?.Name || username || "Developer";
  const role = userData?.Role || "Team Member";
  const department = userData?.Department || "Editorial & Research";
  const imageUrl =
    userData?.ImageUrl ||
    "https://ecellmjcet.com/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.jpg";
  const profileUrl = `https://www.ecellmjcet.com/profile/${username}`;

  // Create dynamic meta content
  const pageTitle = `${name}'s Profile | ECell-MJCET`;
  const pageDescription = `Explore the profile of ${name}, ${role} at ${department} with a passion for leadership, collaboration, and innovation.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `${name}, profile, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet`,
    openGraph: {
      title: `${name} | ${role} | Ecell MJCET`,
      description: pageDescription,
      url: profileUrl,
      type: "profile",
      images: [{ url: imageUrl, alt: `${name}'s profile photo` }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@EcellMJCET",
      title: `${name} | ${role} | Ecell MJCET`,
      description: pageDescription,
      images: [{ url: imageUrl, alt: `${name}'s profile photo` }],
    },
    other: {
      "schema:person": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: name,
        url: profileUrl,
        image: imageUrl,
        jobTitle: role,
        worksFor: { "@type": "Organization", name: "E-Cell MJCET" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: role,
          email: userData?.Email || "contact@ecellmjcet.com",
        },
      }),
    },
  };
}

export default function ProfilePageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
