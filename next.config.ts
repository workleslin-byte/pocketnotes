import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "www.pocketnotes.in" },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
