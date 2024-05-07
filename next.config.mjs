import { withPayload } from '@payloadcms/next/withPayload'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverOnlyDependencies: [ '/Users/alessio/Documents/GitHub/payload-3.0-alpha-demo/payload.config.proxy.ts']
  }
  // Your Next.js config here
}

export default withPayload(nextConfig)
