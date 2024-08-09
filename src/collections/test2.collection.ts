import { CollectionConfig } from 'payload'

export const TestCollection2: CollectionConfig = {
  slug: 'test2',
  fields: [
    {
      name: 'test2',
      type: 'text',
      admin: {
        components: {
          Label: '/src/components/Test#TestComponent',
        },
      },
    },
  ],
}
