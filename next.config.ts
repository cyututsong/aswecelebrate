import type { NextConfig } from 'next';

const config: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.weddingwire.com',
        pathname: '/**',
      },
    ],
  }
};

export default config;