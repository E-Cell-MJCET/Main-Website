import Head from "next/head";

export const metadata = {
  title: "Hackcelerate 2025 | E-Cell MJCET | Tech Innovation Hackathon",
  description:
    "Hackcelerate 2025 by E-Cell MJCET is a high-energy tech hackathon that brings developers, designers, and entrepreneurs together to innovate, solve real-world problems, and build scalable, revenue-generating solutions.",
  keywords:
    "Hackcelerate, Hackcelerate 2025, E-Cell MJCET, hackathon, tech event, innovation, coding competition, startups, entrepreneurship, developers, designers, product development, scalable solutions, problem-solving, business innovation, student hackathon",
  og: {
    title: "Hackcelerate 2025 | Tech Innovation Hackathon by E-Cell MJCET",
    description:
      "Join Hackcelerate 2025, the ultimate student hackathon by E-Cell MJCET, where innovation meets execution. Collaborate, code, and create real-world solutions with startup potential.",
    url: "https://www.ecellmjcet.com/hackcelerate", 
    type: "website",
    image:
      "https://ecellmjcet.com/assets/hackcel_banner site.png", 
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title: "Hackcelerate 2025 | Tech Innovation Hackathon by E-Cell MJCET",
    description:
      "Build, innovate, and launch your ideas at Hackcelerate 2025 — E-Cell MJCET's flagship hackathon for developers, designers, and aspiring entrepreneurs.",
    image:
      "https://ecellmjcet.com/assets/hackcel_banner site.png", 
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Hackcelerate 2025",
    startDate: "2025-04-17", 
    endDate: "2025-05-31",   
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "MJCET Campus",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mount Pleasant, 8-2-249, Rd Number 3, Banjara Hills",
        addressLocality: "Hyderabad",
        postalCode: "500034",
        addressCountry: "IN",
      },
    },
    image: "https://ecellmjcet.com/assets/hackcel_banner site.png",
    description:
      "Hackcelerate 2025 is a national-level hackathon organized by E-Cell MJCET, where innovation meets execution. Participants build tech solutions with the potential to scale into impactful startups.",
    organizer: {
      "@type": "Organization",
      name: "E-Cell MJCET",
      url: "https://www.ecellmjcet.com",
    },
  },
};

export default function HackcelerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
