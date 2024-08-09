import { CollectionConfig } from 'payload'

export const TestCollection: CollectionConfig = {
  slug: 'test',
  fields: [
    {
      name: 'test',
      type: 'text',
      admin: {
        components: {
          Label: '/src/components/Test#TestComponent',
        },
      },
    },
  ],
}
