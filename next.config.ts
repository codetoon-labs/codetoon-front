import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</.well-known/api-catalog>; rel="api-catalog"',
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true, // Required for Cloudflare Workers
  },
  transpilePackages: ['swiper'],
  eslint: {
    ignoreDuringBuilds: true, // Speeds up builds on Cloudflare
  },
  typescript: {
    ignoreBuildErrors: true, // Speeds up builds on Cloudflare
  },
  // External packages for server components
  serverExternalPackages: [],
  // Output configuration for OpenNext.js
  output: "standalone",
};

export default nextConfig;
