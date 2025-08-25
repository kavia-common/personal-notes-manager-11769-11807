import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For CI preview static export; if your app needs SSR, remove this.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
