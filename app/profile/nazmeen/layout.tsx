import type { ReactNode } from "react";

export const metadata = {
  title: "Nazmeen Sultana | Editorial & Research Head | Ecell MJCET",
  description:
    "Explore the profile of Nazmeen Sultana, a creative problem-solver with a passion for leadership, collaboration, and innovation. Skilled in organizing events, effective communication, and building meaningful connections.",
  keywords:
    "Nazmeen Sultana, profile, leadership, collaboration, innovation, events, communication, connections",
  og: {
    title: "Nazmeen Sultana | Editorial & Research Head | Ecell MJCET",
    description:
      "Discover the achievements and experiences of Nazmeen Sultana, a dedicated and innovative individual with a passion for leadership and collaboration.",
    url: "https://www.ecellmjcet.com/profile/nazmeen", // Change URL to match the actual profile URL
    type: "profile",
    image:
      "https://ecellmjcet.com/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.jpg", // Update with the actual image path
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title: "Nazmeen Sultana | Editorial & Research Head | Ecell MJCET",
    keywords:
      "Nazmeen Sultana, profile, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
    description:
      "Explore the profile of Nazmeen Sultana, a creative problem-solver with a passion for leadership, collaboration, and innovation.",
    image:
      "https://ecellmjcet.com/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.jpg", // Update with the actual image path
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nazmeen Sultana",
    url: "https://www.ecellmjcet.com/profile/nazmeen",
    image:
      "https://ecellmjcet.com/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.jpg",
    jobTitle: "Execom",
    worksFor: {
      "@type": "Organization",
      name: "E-Cell MJCET",
    },
    sameAs: [
      "https://github.com/nazzmeen",
      "https://www.linkedin.com/in/nazmeen-sultana-3ab662252/",
      "https://www.instagram.com/n4xmeen._/",
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "nazmeensultana666@gmail.com",
  },
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  );
}
