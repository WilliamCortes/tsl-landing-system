import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/landings/:slug",
        destination: "/landing/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
