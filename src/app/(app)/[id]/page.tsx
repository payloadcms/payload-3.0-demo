import type { Page } from 'payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const Page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const payload = await getPayloadHMR({ config })

  const page = await payload.findByID({
    collection: 'pages',
    id: params.id,
  })

  console.log(`page ${page.title} rendering`)

  return page.title
}

export default Page

export const generateStaticParams = async () => {
  const payload = await getPayloadHMR({ config })

  const query = await payload.find({
    collection: 'pages',
    limit: 200,
  })

  return query.docs.map((doc) => ({
    id: doc.id,
  }))
}
