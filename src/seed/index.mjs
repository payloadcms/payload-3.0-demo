// src/seed.ts
import { getPayload } from 'payload'
import { loadConfig } from './loadConfig.js'

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export const index = async () => {
  const configPath = path.resolve(dirname, '../../payload.config.ts')
  console.log('configPath', configPath)
  console.log('loading config...')
  const config = await loadConfig(configPath)
  console.log('loaded config!')

  const payload = await getPayload({ config })

  console.log('COLLECTIONS', payload.collections)
}

void index()
