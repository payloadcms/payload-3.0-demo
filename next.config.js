const withPayload = require("@payloadcms/next/withPayload");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@payloadcms/db-mongodb"],
  },
};

module.exports = withPayload(nextConfig);
