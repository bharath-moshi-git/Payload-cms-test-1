import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
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
      defaultValue: 'Home Page Content',
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
                  defaultValue: 'The Jewel of Coorg, Where Time Slows Down.',
                },
                {
                  name: 'headingHighlight',
                  type: 'text',
                  label: 'Highlighted Word',
                  defaultValue: 'Coorg,',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Hero Subheading / Description',
                  defaultValue:
                    'Beyond the experience of a resort, this is a place that stays with you long after you leave, and welcomes you back with the warmth of knowing some of it belongs to you.',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Primary CTA Button Text',
                  defaultValue: 'Download Brochure',
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Primary CTA Button Link',
                  defaultValue: '#brochure',
                },
                {
                  name: 'secondaryCtaText',
                  type: 'text',
                  label: 'Secondary CTA Button Text',
                  defaultValue: 'Explore Amenities',
                },
                {
                  name: 'secondaryCtaLink',
                  type: 'text',
                  label: 'Secondary CTA Button Link',
                  defaultValue: '#services',
                },
              ],
            },
          ],
        },
        {
          label: 'Key Capabilities Section',
          fields: [
            {
              name: 'features',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Key Capabilities',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue:
                    'Everything configured to build and manage multi-page content effortlessly.',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Feature Cards',
                  labels: {
                    singular: 'Feature Card',
                    plural: 'Feature Cards',
                  },
                  defaultValue: [
                    {
                      title: 'Tailwind CSS v4',
                      description:
                        'Fully integrated utility-first styling with high performance and zero setup friction.',
                      icon: '⚡',
                    },
                    {
                      title: 'Payload CMS Backend',
                      description:
                        'Edit your headings, subheadings, and sections visually from the Payload Admin interface.',
                      icon: '⚙️',
                    },
                    {
                      title: 'Multi-Page Routing',
                      description:
                        'Dynamically generate and route any number of pages directly from database slugs.',
                      icon: '🌐',
                    },
                  ],
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Card Title',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Card Description',
                    },
                    {
                      name: 'icon',
                      type: 'text',
                      label: 'Icon / Emoji',
                      defaultValue: '⚡',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Amenities & Services Section',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Curated Experiences & Amenities',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue:
                    'Thoughtfully crafted spaces and services designed for ultimate comfort.',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Service Cards',
                  labels: {
                    singular: 'Service Card',
                    plural: 'Service Cards',
                  },
                  defaultValue: [
                    {
                      title: 'Private Villa Retreats',
                      description:
                        'Spacious private sanctuaries featuring luxury interiors and breathtaking plantation views.',
                      icon: '🏡',
                    },
                    {
                      title: 'Organic Dining & Cafes',
                      description:
                        'Farm-to-table culinary experiences using locally sourced ingredients from Coorg estate farms.',
                      icon: '☕',
                    },
                    {
                      title: 'Wellness & Nature Walks',
                      description:
                        'Rejuvenate with serene guided nature walks and traditional wellness treatments.',
                      icon: '🌿',
                    },
                  ],
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Service Title',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Service Description',
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
        {
          label: 'Testimonials Section',
          fields: [
            {
              name: 'testimonials',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Guest Experiences & Testimonials',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue: 'Hear what visitors have to say about their experience.',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Testimonials',
                  labels: {
                    singular: 'Testimonial',
                    plural: 'Testimonials',
                  },
                  defaultValue: [
                    {
                      quote:
                        'An unforgettable escape in the heart of nature. The peace and craftsmanship are unmatched.',
                      author: 'Rohan & Priya Sharma',
                      location: 'Bangalore',
                    },
                    {
                      quote:
                        'Managing and customizing the resort details visually through Payload Admin makes everything seamless.',
                      author: 'Resort Operations Team',
                      location: 'Coorg',
                    },
                  ],
                  fields: [
                    {
                      name: 'quote',
                      type: 'textarea',
                      label: 'Testimonial Quote',
                      required: true,
                    },
                    {
                      name: 'author',
                      type: 'text',
                      label: 'Author Name',
                    },
                    {
                      name: 'location',
                      type: 'text',
                      label: 'Author Location / Role',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Call To Action / Contact Section',
          fields: [
          {
          name: 'cta',
          type: 'group',
          fields: [
          {
          name: 'heading',
          type: 'text',
          label: 'CTA Heading',
          defaultValue: 'Plan Your Unforgettable Stay',
          },
          {
          name: 'subheading',
          type: 'textarea',
          label: 'CTA Subheading',
          defaultValue:
            'Get in touch with our team to reserve your sanctuary or inquire about villa ownership.',
          },
          {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Contact Us Today',
          },
          {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
          defaultValue: '#contact',
          },
          {
          name: 'contactEmail',
          type: 'text',
          label: 'Contact Email',
          defaultValue: 'stay@aarde.com',
          },
          {
          name: 'contactPhone',
          type: 'text',
          label: 'Contact Phone',
          defaultValue: '+91 98765 43210',
          },
          ],
          },
          ],
          },
          {
          label: 'Blogs Section',
          fields: [
          {
          name: 'blogs',
          type: 'group',
          fields: [
          {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          defaultValue: 'From the Blog',
          },
          {
          name: 'subheading',
          type: 'textarea',
          label: 'Section Subheading',
          defaultValue: 'Stay updated with the latest news and stories.',
          },
          {
          name: 'selectedBlogs',
          type: 'relationship',
          relationTo: 'blogs',
          hasMany: true,
          label: 'Selected Blogs',
          },
          ],
          },
          ],
          },
          ],
          },
          ],
          }

