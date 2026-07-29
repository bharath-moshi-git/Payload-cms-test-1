import type { CollectionConfig } from 'payload'

export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  admin: {
    group: 'Form Submissions',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'position', 'createdAt'],
  },
  access: {
    // Anyone on the frontend can submit job applications and upload CVs
    create: () => true,
    // Only authenticated admin users can view, update, or delete applicant entries
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Applicant Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Applicant Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Applicant Phone Number',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      label: 'Applied Position',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Uploaded CV / Resume File',
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      label: 'Cover Letter / Additional Notes',
    },
  ],
  timestamps: true,
}
