import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Projects',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'price', 'location', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL path for this project (e.g. "aarde-residence")',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Starting Price / Range',
      admin: {
        description: 'e.g. $1.5M or Rs. 4.5 Cr onwards',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Overview',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'project-categories',
      hasMany: true,
      required: true,
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: false,
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image (Upload)',
    },
    {
      name: 'heroImageUrl',
      type: 'text',
      label: 'Hero Image URL (Unsplash or External Fallback)',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Amenities Section',
          fields: [
            {
              name: 'amenities',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Curated Amenities',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue: 'Thoughtfully crafted spaces and services designed for ultimate comfort.',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Amenities List',
                  labels: {
                    singular: 'Amenity',
                    plural: 'Amenities',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Amenity Title',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Amenity Description',
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
          label: 'Gallery Section',
          fields: [
            {
              name: 'gallery',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Project Gallery',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue: 'A visual walkthrough of your potential future home.',
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Gallery Images',
                  labels: {
                    singular: 'Gallery Image',
                    plural: 'Gallery Images',
                  },
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Image File',
                    },
                    {
                      name: 'imageUrl',
                      type: 'text',
                      label: 'Image URL (Fallback / Unsplash)',
                    },
                    {
                      name: 'isVideo',
                      type: 'checkbox',
                      label: 'Is this a Video?',
                      defaultValue: false,
                    },
                    {
                      name: 'videoUrl',
                      type: 'text',
                      label: 'Video URL (Direct link to .mp4 or embed URL)',
                    },
                    {
                      name: 'caption',
                      type: 'text',
                      label: 'Caption / Room Name',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Reviews Section',
          fields: [
            {
              name: 'reviews',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Resident Reviews',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Section Subheading',
                  defaultValue: 'Hear what our community residents and buyers have to say.',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Testimonials',
                  labels: {
                    singular: 'Testimonial',
                    plural: 'Testimonials',
                  },
                  fields: [
                    {
                      name: 'author',
                      type: 'text',
                      label: 'Author Name',
                      required: true,
                    },
                    {
                      name: 'role',
                      type: 'text',
                      label: 'Role / Designation (e.g. Villa Owner)',
                    },
                    {
                      name: 'quote',
                      type: 'textarea',
                      label: 'Review Quote',
                      required: true,
                    },
                    {
                      name: 'rating',
                      type: 'number',
                      label: 'Rating (1-5)',
                      defaultValue: 5,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Location Map Section',
          fields: [
            {
              name: 'locationMap',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'Location & Map',
                },
                {
                  name: 'address',
                  type: 'text',
                  label: 'Full Address',
                },
                {
                  name: 'mapUrl',
                  type: 'text',
                  label: 'Google Maps Embed/iFrame URL',
                },
                {
                  name: 'latitude',
                  type: 'number',
                  label: 'Latitude',
                },
                {
                  name: 'longitude',
                  type: 'number',
                  label: 'Longitude',
                },
                {
                  name: 'nearbyPlaces',
                  type: 'array',
                  label: 'Nearby Locations / Distance',
                  labels: {
                    singular: 'Nearby Location',
                    plural: 'Nearby Locations',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Place Name (e.g. Airport, Hospital)',
                      required: true,
                    },
                    {
                      name: 'distance',
                      type: 'text',
                      label: 'Distance / Drive Time (e.g. 10 mins drive)',
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
