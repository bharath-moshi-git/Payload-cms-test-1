import type { CollectionConfig } from 'payload'

export const ContactUsPage: CollectionConfig = {
  slug: 'contact-page',
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
      defaultValue: 'Contact Us Page',
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
                  defaultValue: 'Get In Touch With Us',
                },
                {
                  name: 'headingHighlight',
                  type: 'text',
                  label: 'Highlighted Word',
                  defaultValue: 'Touch',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Hero Subheading / Description',
                  defaultValue:
                    'Whether you have questions about our luxury villa projects or want to reserve your stay, our team is here to assist you.',
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
          label: 'Contact Info Section',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Contact Information',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: 'Office / Resort Address',
                  defaultValue: 'AARDE Luxury Estate, Coorg Hills, Karnataka, India - 571201',
                },
                {
                  name: 'email',
                  type: 'text',
                  label: 'Contact Email',
                  defaultValue: 'stay@aarde.com',
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Contact Phone Number',
                  defaultValue: '+91 98765 43210',
                },
                {
                  name: 'workingHours',
                  type: 'text',
                  label: 'Working Hours',
                  defaultValue: 'Monday - Sunday: 9:00 AM - 8:00 PM',
                },
              ],
            },
          ],
        },
        {
          label: 'Form Settings Section',
          fields: [
            {
              name: 'formSettings',
              type: 'group',
              fields: [
                {
                  name: 'formHeading',
                  type: 'text',
                  label: 'Form Card Heading',
                  defaultValue: 'Send Us A Message',
                },
                {
                  name: 'formSubheading',
                  type: 'textarea',
                  label: 'Form Subheading',
                  defaultValue: 'Fill out the details below and our team will get back to you within 24 hours.',
                },
                {
                  name: 'submitButtonText',
                  type: 'text',
                  label: 'Submit Button Label',
                  defaultValue: 'Submit Inquiry',
                },
                {
                  name: 'successMessage',
                  type: 'textarea',
                  label: 'Form Submission Success Message',
                  defaultValue: 'Thank you! Your message has been received. Our team will contact you shortly.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
