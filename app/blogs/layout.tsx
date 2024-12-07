import type { ReactNode } from "react";

export const metadata = {
  title: "Blogs | E-Cell MJCET",
  description:
    "Explore insightful articles and stories on entrepreneurship, innovation, and leadership. Stay updated with the latest trends, tips, and success stories from the entrepreneurial world, brought to you by Ecell MJCET.",
  keywords:
    "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
  og: {
    title: "Blogs |  E-Cell MJCET",
    description:
      "Explore insightful articles and stories on entrepreneurship, innovation, and leadership. Stay updated with the latest trends, tips, and success stories from the entrepreneurial world, brought to you by Ecell MJCET.",
    url: "https://www.ecellmjcet.com/blogs/", // Change URL to match the actual profile URL
    type: "profile",
    image: "https://www.ecellmjcet.com/assets/blogs/tre/title.png", // Update with the actual image path
  },
  twitter: {
    card: "summary_large_image",
    site: "@EcellMJCET",
    title: "Blogs |  E-Cell MJCET",
    keywords:
      "Entrepreneurship and innovation, Role of innovation in business, Fostering innovation in startups, Types of innovation in entrepreneurship, Innovation-driven growth, Importance of innovation for entrepreneurs, leadership, collaboration, innovation, events, communication, connections, Ecell, ecell, ecellmjcet, Ecell Mjcet, E-Cell MJCET",
    description:
      "Explore insightful articles and stories on entrepreneurship, innovation, and leadership. Stay updated with the latest trends, tips, and success stories from the entrepreneurial world, brought to you by Ecell MJCET.",
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
  return (
    <html>
      <body>
        <div> {children}</div>
      </body>
    </html>
  );
}
