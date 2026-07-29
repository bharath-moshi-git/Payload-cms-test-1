import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    group: 'Form Submissions',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
  },
  access: {
    // Anyone on the frontend can create a submission
    create: () => true,
    // Only authenticated admin users can view, update, delete, or access admin for submissions
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Inquiry Subject',
      defaultValue: 'General Inquiry',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message / Inquiry Details',
    },
  ],
  timestamps: true,
}
