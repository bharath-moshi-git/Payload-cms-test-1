import type { CollectionConfig } from 'payload'
import path from 'path'

const getStaticDir = () => {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return '/tmp'
  }
  return path.resolve('media')
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media & Assets',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: getStaticDir(),
  },
}


