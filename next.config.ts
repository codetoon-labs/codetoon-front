import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wa",
        destination:
          "https://wa.me/201149996247?text=" +
          encodeURIComponent(
            "Hi CodeToon! I'd like to learn more about your services."
          ),
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // RFC 8288 Link headers for agent discovery
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '<https://codetoon.net/llms.txt>; rel="llms-txt"; type="text/markdown", <https://codetoon.net/sitemap.xml>; rel="sitemap"; type="application/xml"',
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
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
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
