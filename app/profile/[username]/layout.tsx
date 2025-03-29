import Head from "next/head";
import type { ReactNode } from "react";

export const metadata = {
  title: "Profile Page Dev | Ecell MJCET",
  description:
    "Explore the profile of devloper builds, a creative problem-solver with a passion for leadership, collaboration, and innovation. Skilled in organizing events, effective communication, and building meaningful connections.",
  keywords:
    "Developer, profile, leadership, collaboration, innovation, events, communication, connections",
  og: {
    title: "Developer | Editorial & Research Head | Ecell MJCET",
    description:
      "Discover the achievements and experiences of Developer, a dedicated and innovative individual with a passion for leadership and collaboration.",
    url: "https://www.ecellmjcet.com/profile/rukhaiya", // Change URL to match the actual profile URL
    type: "profile",
    image:
      "https://ecellmjcet.com/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.jpg", // Update with the actual image path
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title: "Developer | Editorial & Research Head | Ecell MJCET",
    keywords:
      "Developer, profile, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
    description:
      "Explore the profile of Developer, a creative problem-solver with a passion for leadership, collaboration, and innovation.",
    image:
      "https://ecellmjcet.com/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.jpg", // Update with the actual image path
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Developer",
    url: "https://www.ecellmjcet.com/profile/rukhaiya",
    image:
      "https://ecellmjcet.com/assets/Execom/Editorial/Rukhaiya/Rukhaiya.jpg",
    jobTitle: "Execom",
    worksFor: {
      "@type": "Organization",
      name: "E-Cell MJCET",
    },
    sameAs: ["https://www.instagram.com/rukhaiyaaa._/"],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Editorial Reasearch Head",
    email: "Developer@gmail.com",
  },
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta property="og:title" content={metadata.og.title} />
        <meta property="og:description" content={metadata.og.description} />
        <meta property="og:url" content={metadata.og.url} />
        <meta property="og:type" content={metadata.og.type} />
        <meta property="og:image" content={metadata.og.image} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </Head>
      <div>{children}</div>
    </>
  );
}
