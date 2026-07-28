import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL path for this page (e.g. "about", "services")',
      },
    },
    {
      name: 'bodyContent',
      type: 'textarea',
      label: 'Page Content / Body',
    },
  ],
}
