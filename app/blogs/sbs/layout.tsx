import type { ReactNode } from "react";

export const metadata = {
  title:
    "How to Build a Strong Brand for Your Startup | Rukhaiya Begum | Ecell MJCET",
  description:
    "In this blog, we’ll explore how to build a strong brand for your startup. We’ll discuss the core principles of branding, the steps you need to take, and the tools available to help you create a brand that resonates with your audience and stands the test of time.",
  keywords:
    "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
  og: {
    title:
      "How to Build a Strong Brand for Your Startup | Rukhaiya Begum | Ecell MJCET",
    description:
      "In this blog, we’ll explore how to build a strong brand for your startup. We’ll discuss the core principles of branding, the steps you need to take, and the tools available to help you create a brand that resonates with your audience and stands the test of time.",
    url: "https://www.ecellmjcet.com/blogs/ofe", // Change URL to match the actual profile URL
    type: "profile",
    image: "https://www.ecellmjcet.com/assets/blogs/ofe.jpg", // Update with the actual image path
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title:
      "How to Build a Strong Brand for Your Startup | Rukhaiya Begum | Ecell MJCET",
    keywords:
      "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
    description:
      "In this blog, we’ll explore how to build a strong brand for your startup. We’ll discuss the core principles of branding, the steps you need to take, and the tools available to help you create a brand that resonates with your audience and stands the test of time.",
    image: "https://www.ecellmjcet.com/assets/blogs/sbs.jpg", // Update with the actual image path
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rukhaiya Begum",
    url: "https://www.ecellmjcet.com/profile/rukhaiya",
    image: "https://www.ecellmjcet.com/assets/blogs/sbs.jpg",
    jobTitle: "Execom",
    worksFor: {
      "@type": "Organization",
      name: "E-Cell MJCET",
    },
  },
};

export default function Bloglayout({ children }: { children: ReactNode }) {
  return (
    <html>
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
      <body>
        <div> {children}</div>
      </body>
    </html>
  );
}
