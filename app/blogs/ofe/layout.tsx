import Head from "next/head";
import type { ReactNode } from "react";

export const metadata = {
  title:
    "Overcoming Failure in Entrepreneurship | Rukhaiya Begum | Ecell MJCET",
  description:
    "This blog post will explore how entrepreneurs can overcome failure, learn from their mistakes, and bounce back stronger. Whether you’re a new business owner or a seasoned entrepreneur, understanding how to manage failure and turn setbacks into growth opportunities is vital to your long-term success.",
  keywords:
    "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
  og: {
    title:
      "Overcoming Failure in Entrepreneurship | Rukhaiya Begum | Ecell MJCET",
    description:
      "Innovation plays a vital role in entrepreneurship by driving the creation of unique products, services, or solutions. It fosters competitive advantages, meets evolving customer needs, and opens new markets. Entrepreneurs leverage innovation to solve problems creatively, adapt to changing trends, and ensure the growth and sustainability of their ventures.",
    url: "https://www.ecellmjcet.com/blogs/ofe", // Change URL to match the actual profile URL
    type: "profile",
    image: "https://www.ecellmjcet.com/assets/blogs/ofe.jpg", // Update with the actual image path
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title:
      "Overcoming Failure in Entrepreneurship | Rukhaiya Begum | Ecell MJCET",
    keywords:
      "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
    description:
      "This blog post will explore how entrepreneurs can overcome failure, learn from their mistakes, and bounce back stronger. Whether you’re a new business owner or a seasoned entrepreneur, understanding how to manage failure and turn setbacks into growth opportunities is vital to your long-term success.",
    image: "https://www.ecellmjcet.com/assets/blogs/ofe.jpg", // Update with the actual image path
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rukhaiya Begum",
    url: "https://www.ecellmjcet.com/profile/rukhaiya",
    image: "https://www.ecellmjcet.com/assets/blogs/ofe.jpg",
    jobTitle: "Execom",
    worksFor: {
      "@type": "Organization",
      name: "E-Cell MJCET",
    },
  },
};

export default function Bloglayout({ children }: { children: ReactNode }) {
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
