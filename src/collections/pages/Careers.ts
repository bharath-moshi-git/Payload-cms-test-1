import type { CollectionConfig } from 'payload'

export const CareersPage: CollectionConfig = {
  slug: 'careers-page',
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
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
      defaultValue: 'Careers Page',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header Section',
          fields: [
            {
              name: 'header',
              type: 'group',
              fields: [
                {
                  name: 'logoText',
                  type: 'text',
                  label: 'Logo Text / Brand Title',
                  defaultValue: 'A A R D E',
                },
                {
                  name: 'logoSubtext',
                  type: 'text',
                  label: 'Logo Subtext',
                  defaultValue: 'PROJECTS',
                },
                {
                  name: 'headerCtaText',
                  type: 'text',
                  label: 'Header Button Text',
                  defaultValue: 'Get in touch',
                },
                {
                  name: 'headerCtaLink',
                  type: 'text',
                  label: 'Header Button Link',
                  defaultValue: '/contact',
                },
              ],
            },
          ],
        },
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Hero Main Heading',
                  defaultValue: 'Build Your Career With Us',
                },
                {
                  name: 'headingHighlight',
                  type: 'text',
                  label: 'Highlighted Word',
                  defaultValue: 'Career',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Hero Subheading / Description',
                  defaultValue:
                    'Join our passionate team shaping luxury hospitality and sustainable resort development in Coorg.',
                },
                {
                  name: 'fallbackImageUrl',
                  type: 'text',
                  label: 'Background Image URL',
                  defaultValue: '/coorg_bg.jpg',
                },
              ],
            },
          ],
        },
        {
          label: 'Open Positions Section',
          fields: [
            {
              name: 'positions',
              type: 'group',
              fields: [
                {
                  name: 'sectionHeading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Current Openings',
                },
                {
                  name: 'sectionSubheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue:
                    'Explore available career opportunities and apply with your CV today.',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Job Openings',
                  labels: {
                    singular: 'Job Opening',
                    plural: 'Job Openings',
                  },
                  defaultValue: [
                    {
                      title: 'Resort Operations Manager',
                      department: 'Operations',
                      location: 'Coorg, Karnataka',
                      type: 'Full-time',
                      description:
                        'Oversee day-to-day guest experiences, villa hospitality, and team operations at AARDE Estate.',
                    },
                    {
                      title: 'Head Chef - Organic Dining',
                      department: 'Food & Beverage',
                      location: 'Coorg, Karnataka',
                      type: 'Full-time',
                      description:
                        'Lead our farm-to-table culinary team utilizing fresh produce grown locally on estate farms.',
                    },
                    {
                      title: 'Guest Relations Executive',
                      department: 'Hospitality',
                      location: 'Coorg, Karnataka',
                      type: 'Full-time',
                      description:
                        'Provide personalized concierge services and memorable stays for villa owners and guests.',
                    },
                  ],
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Job Title',
                      required: true,
                    },
                    {
                      name: 'department',
                      type: 'text',
                      label: 'Department',
                    },
                    {
                      name: 'location',
                      type: 'text',
                      label: 'Location',
                      defaultValue: 'Coorg, Karnataka',
                    },
                    {
                      name: 'type',
                      type: 'text',
                      label: 'Employment Type (e.g. Full-time / Part-time)',
                      defaultValue: 'Full-time',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Job Description',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Application Form Settings',
          fields: [
            {
              name: 'formSettings',
              type: 'group',
              fields: [
                {
                  name: 'formHeading',
                  type: 'text',
                  label: 'Form Card Heading',
                  defaultValue: 'Apply For A Position',
                },
                {
                  name: 'formSubheading',
                  type: 'textarea',
                  label: 'Form Subheading',
                  defaultValue:
                    'Submit your resume / CV below and our HR team will review your application.',
                },
                {
                  name: 'submitButtonText',
                  type: 'text',
                  label: 'Submit Button Label',
                  defaultValue: 'Submit Application & CV',
                },
                {
                  name: 'successMessage',
                  type: 'textarea',
                  label: 'Success Message',
                  defaultValue:
                    'Thank you for applying! Your application and CV have been received. We will contact you if your profile matches our requirements.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
