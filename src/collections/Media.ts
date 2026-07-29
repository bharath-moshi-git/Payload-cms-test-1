import type { CollectionConfig } from 'payload'
import path from 'path'
import fs from 'fs'

const getStaticDir = () => {
  const isServerless = Boolean(process.env.VERCEL || process.env.NODE_ENV === 'production')
  const dir = isServerless ? '/tmp/media' : path.resolve('media')

  if (typeof window === 'undefined') {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    } catch (e) {
      console.warn('Could not auto-create staticDir:', e)
    }
  }
  return dir
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media & Assets',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: getStaticDir(),
  },
}

