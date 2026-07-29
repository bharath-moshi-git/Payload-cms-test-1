import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Administration',
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
