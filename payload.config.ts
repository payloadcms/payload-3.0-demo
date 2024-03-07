import path from "path";
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import { slateEditor } from '@payloadcms/richtext-slate'
// import { mongooseAdapter } from "@payloadcms/db-mongodb"; // database-adapter-import
import { buildConfig } from "payload/config";
import sharp from 'sharp'
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({}),
  // editor: slateEditor({}),
  collections: [
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        }
      ]
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'text',
          type: 'text',
        }
      ]
    }
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI
    }
  }),
  // db: mongooseAdapter({
  //   url: process.env.MONGODB_URI || '',
  // }),
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
        }
      })
    }
  },
  sharp,
});
