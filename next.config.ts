import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare quick-tunnel previews to load Next.js dev assets
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Disable source maps in production to protect code
  productionBrowserSourceMaps: false,
  // Pin Turbopack root when multiple lockfiles exist (npm + pnpm)
  turbopack: {
    root: process.cwd(),
  },
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
