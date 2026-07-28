import type { Field } from 'payload'

import deepMerge from '../utils/deepMerge'
import formatSlug from '../utils/formatSlug'

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          (args) => {
            const { value, originalDoc, data } = args
            const fieldToSlug = data?.[fieldToUse]
            if (typeof fieldToSlug === 'string' && (value === undefined || value === '')) {
              return formatSlug(fieldToSlug)
            }
            return value
          }
        ],
      },
    },
    overrides,
  )
