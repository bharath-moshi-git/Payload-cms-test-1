import type { CollectionConfig } from 'payload'

export const AboutUsPage: CollectionConfig = {
  slug: 'about-page',
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
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'About Us Page',
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
                  label: 'Hero Heading',
                  defaultValue: 'About Us',
                },
                {
                  name: 'headingHighlight',
                  type: 'text',
                  label: 'Hero Heading Highlighted Word',
                  defaultValue: 'Us',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Hero Subheading',
                  defaultValue: 'Learn more about our mission, vision, and team.',
                },
                {
                  name: 'fallbackImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image (Upload)',
                },
                {
                  name: 'fallbackImageUrl',
                  type: 'text',
                  label: 'Background Image URL',
                  defaultValue: '/coorg_bg.jpg',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Hero CTA Button Text',
                  defaultValue: 'Contact Us',
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Hero CTA Button Link',
                  defaultValue: '#contact',
                },
              ],
            },
          ],
        },
        {
          label: 'Story / Overview Section',
          fields: [
            {
              name: 'story',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Our Story',
                },
                {
                  name: 'bodyContent',
                  type: 'textarea',
                  label: 'Story Body Content',
                  defaultValue:
                    'Founded with a vision for exceptional living, A A R D E Projects brings timeless design and luxury together.',
                },
              ],
            },
          ],
        },
        {
          label: 'Values Section',
          fields: [
            {
              name: 'values',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Values Section Heading',
                  defaultValue: 'Our Core Values',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Value Items',
                  labels: {
                    singular: 'Value Item',
                    plural: 'Value Items',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Title',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                    {
                      name: 'icon',
                      type: 'text',
                      label: 'Icon / Emoji',
                      defaultValue: '✨',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
