import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false
  }
}

//export default withBundleAnalyzer(withPayload(nextConfig))
export default withPayload(nextConfig)
