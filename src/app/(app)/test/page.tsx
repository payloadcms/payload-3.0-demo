import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function Page() {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  return <div>test ${payload?.config?.collections?.length}</div>
}
