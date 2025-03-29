import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/dashboard",
      permanent: false,
    }
  ]
};

export default withNextVideo(nextConfig);