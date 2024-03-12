// loadConfig.ts

import { createRequire } from 'module'

export const loadConfig = async (path) => {
  console.log('inside loadConfig')
  const require = createRequire(import.meta.url)
  console.log('inside loadConfig require typeof', typeof require)

  const CLIENT_EXTENSIONS = [
    '.scss',
    '.css',
    '.svg',
    '.png',
    '.jpg',
    '.eot',
    '.ttf',
    '.woff',
    '.woff2',
  ]

  CLIENT_EXTENSIONS.forEach((ext) => {
    require.extensions[ext] = () => null
  })

  console.log('inside loadConfig path', path)

  const config = require(path).default
  console.log('inside loadConfig config', config)

  return config
}
