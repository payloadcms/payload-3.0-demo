import { register } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
const run = async () => {
  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)
  const url = pathToFileURL(dirname).toString() + '/'

  register('./register/index.js', url)
  console.log('registered!')

  const imported = await import('./payload.config.ts')

  const _config = await imported

  console.log('cfg1', _config)
}

run()
