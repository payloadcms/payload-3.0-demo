/**
 * This is an example of a standalone script that loads in the Payload config
 * and uses the Payload Local API to query the database.
 */

import { getPayload } from 'payload'
import { importConfig } from 'payload/node'

async function run() {
  const awaitedConfig = await importConfig('../../payload.config.ts')
  const payload = await getPayload({ config: awaitedConfig })

  for (let i = 0; i < 100; i++) {
    await payload.create({
      collection: 'pages',
      data: {
        title: `title ${i}`,
      },
    })
  }

  process.exit(0)
}

run().catch(console.error)
