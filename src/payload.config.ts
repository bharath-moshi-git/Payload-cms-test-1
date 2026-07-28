import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { HomePage } from './collections/pages/HomePage'
import { AboutUsPage } from './collections/pages/AboutUs'
import { ContactUsPage } from './collections/pages/ContactUs'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { CareersPage } from './collections/pages/Careers'
import { CareerApplications } from './collections/CareerApplications'
import { Blogs } from './collections/Blogs'
import { BlogCategories } from './collections/BlogCategories'
import { Projects } from './collections/Projects'
import { ProjectCategories } from './collections/ProjectCategories'
import { Locations } from './collections/Locations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    HomePage,
    AboutUsPage,
    ContactUsPage,
    CareersPage,
    Pages,
    Blogs,
    BlogCategories,
    ContactSubmissions,
    CareerApplications,
    Projects,
    ProjectCategories,
    Locations,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'payload-secret-key-fallback-for-build-environment-32-chars-minimum',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        process.env.POSTGRES_URL ||
        process.env.DATABASE_URL ||
        (process.env.NODE_ENV === 'production'
          ? ''
          : 'postgres://postgres:postgres@127.0.0.1:5432/payload'),
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    },
  }),
  sharp,
  plugins: [],
})
