/**
 * This is an example of a standalone script that loads in the Payload config
 * and uses the Payload Local API to query the database.
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function run() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
  })

  console.log(pages)
  process.exit(0)
}

await run()
