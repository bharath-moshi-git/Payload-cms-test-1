import type { Field } from 'payload'

import deepMerge from '../utils/deepMerge'

type Hero = (overrides?: Partial<Field>) => Field

export const hero: Hero = overrides =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    overrides,
  )
