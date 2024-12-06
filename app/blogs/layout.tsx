import type { ReactNode } from "react";

export const metadata = {
  title:
    "The Role of Innovation in Entrepreneurship | Rukhaiya Begum | Ecell MJCET",
  description:
    "Innovation plays a vital role in entrepreneurship by driving the creation of unique products, services, or solutions. It fosters competitive advantages, meets evolving customer needs, and opens new markets. Entrepreneurs leverage innovation to solve problems creatively, adapt to changing trends, and ensure the growth and sustainability of their ventures.",
  keywords:
    "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
  og: {
    title:
      "The Role of Innovation in Entrepreneurship | Rukhaiya Begum | Ecell MJCET",
    description:
      "Innovation plays a vital role in entrepreneurship by driving the creation of unique products, services, or solutions. It fosters competitive advantages, meets evolving customer needs, and opens new markets. Entrepreneurs leverage innovation to solve problems creatively, adapt to changing trends, and ensure the growth and sustainability of their ventures.",
    url: "https://www.ecellmjcet.com/blogs/", // Change URL to match the actual profile URL
    type: "profile",
    image: "https://www.ecellmjcet.com/assets/blogs/tre/title.png", // Update with the actual image path
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title:
      "The Role of Innovation in Entrepreneurship | Rukhaiya Begum | Ecell MJCET",
    keywords:
      "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
    description:
      "Innovation plays a vital role in entrepreneurship by driving the creation of unique products, services, or solutions. It fosters competitive advantages, meets evolving customer needs, and opens new markets. Entrepreneurs leverage innovation to solve problems creatively, adapt to changing trends, and ensure the growth and sustainability of their ventures.",
    image: "https://www.ecellmjcet.com/assets/blogs/tre/title.png", // Update with the actual image path
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rukhaiya Begum",
    url: "https://www.ecellmjcet.com/profile/rukhaiya",
    image: "https://www.ecellmjcet.com/assets/blogs/tre/title.png",
    jobTitle: "Execom",
    worksFor: {
      "@type": "Organization",
      name: "E-Cell MJCET",
    },
  },
};

export default function Bloglayout({ children }: { children: ReactNode }) {
  return <div> {children}</div>;
}
