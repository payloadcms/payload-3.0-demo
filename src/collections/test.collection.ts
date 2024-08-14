import { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

console.log('revalidateTag', revalidateTag)

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
