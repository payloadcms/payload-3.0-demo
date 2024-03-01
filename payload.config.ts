import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb"; // database-adapter-import
import { slateEditor } from "@payloadcms/richtext-slate"; // editor-import
import { buildConfig } from "payload/config";

export default buildConfig({
  editor: slateEditor({}), // editor-config
  collections: [],
  secret: "asdfasdf",
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: "mongodb://localhost:27017/next-payload-3",
  }),
});
