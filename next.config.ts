import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Allow audio from everyayah
  async headers() {
    return [];
  },
};

export default nextConfig;
