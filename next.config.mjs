import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'
import withBundleAnalyzer from '@next/bundle-analyzer'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false
  },
  env: {
    NEXT_PUBLIC_PAYLOAD_CORE_DEV: 'true',
    NEXT_PUBLIC_ROOT_DIR: path.resolve(dirname),
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig)

//export default withBundleAnalyzer(withPayload(nextConfig))
