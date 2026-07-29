import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    group: 'Blogs',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'categories', 'updatedAt'],
    preview: doc => {
      const serverUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || ''
      const secret = process.env.PAYLOAD_PUBLIC_DRAFT_SECRET || ''
      return `${serverUrl}/api/preview?url=${encodeURIComponent(
        `${serverUrl}/blogs/${doc?.slug || ''}`,
      )}&secret=${secret}`
    },
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.user) {
          return { ...data, user: req.user.id }
        }
        return data
      },
    ],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short Summary / Excerpt (for cards)',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedBlogs',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
    },
    slugField(),
  ],
}
