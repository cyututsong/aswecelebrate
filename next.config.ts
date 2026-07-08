import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.weddingwire.com',
        pathname: '/**', // Allows all image paths from this domain
      },
    ],
  },
};


export default nextConfig;
