import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Generate a fully static site in ./out for deployment behind Nginx.
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow Cloudflare quick-tunnel previews to load Next.js dev assets
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Disable source maps in production to protect code
  productionBrowserSourceMaps: false,
  // Pin Turbopack root to this package (avoid mis-inferring ./app)
  turbopack: {
    root: projectRoot,
  },
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    // Static exports have no Next.js server available for image optimization.
    unoptimized: true,
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
