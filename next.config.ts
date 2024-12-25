import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: [
      "www.ecellmjcet.com",
      "localhost",
      "img.freepik.com",
      "www.baass.com",
    ], // Add your external image domains here
  },
};

export default nextConfig;
