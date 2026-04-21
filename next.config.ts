import type { NextConfig } from "next";

/** Static export for Cloudflare Pages — see execution doc & New_Narvo_B2B.md §5. */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
