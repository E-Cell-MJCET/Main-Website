import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "www.ecellmjcet.com",
      "localhost",
      "img.freepik.com",
      "www.baass.com",
      "example.com",
      "images.unsplash.com",
    ], // Add your external image domains here
  },
};

export default nextConfig;
