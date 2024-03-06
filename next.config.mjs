import withPayload from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // serverComponentsExternalPackages: ["@payloadcms/db-mongodb"],
  },
};

export default withPayload(nextConfig);
