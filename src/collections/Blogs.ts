import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    group: 'Blogs',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'categories', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/blogs/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeDuplicate: [
      ({ data }) => {
        return {
          ...data,
          title: data.title ? `${data.title} (Copy)` : 'Copy',
          slug: data.slug ? `${data.slug}-copy` : 'copy',
        }
      },
    ],
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
