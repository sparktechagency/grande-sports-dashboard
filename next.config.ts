import { withNextVideo } from "next-video/process"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/dashboard",
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all
      },
      {
        protocol: "http",
        hostname: "**", // allow all
      },
    ],
  },
}

export default withNextVideo(nextConfig)
