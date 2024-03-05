import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb"; // database-adapter-import
import { slateEditor } from "@payloadcms/richtext-slate"; // editor-import
import { buildConfig } from "payload/config";

export default buildConfig({
  editor: slateEditor({}), // editor-config
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
          name: 'test',
          type: 'number',
        }
      ]
    }
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
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
});
