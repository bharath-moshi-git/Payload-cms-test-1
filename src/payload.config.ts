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

const dbUrl = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
const isNeonOrCloud =
  dbUrl.includes('neon.tech') ||
  dbUrl.includes('sslmode=require') ||
  process.env.NODE_ENV === 'production'

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
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: dbUrl,
      ssl: isNeonOrCloud ? { rejectUnauthorized: false } : false,
    },
    push: true, // Auto-creates database tables on startup/init
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    console.log('==================================================')
    console.log('🚀 PAYLOAD CMS & ADMIN PANEL INITIALIZED')
    console.log('  • Connected DB URI:', dbUrl ? dbUrl.replace(/:[^:@]+@/, ':****@') : 'NOT SET')
    console.log('  • SSL Enabled:     ', isNeonOrCloud)
    console.log('  • Server URL:      ', payload.config.serverURL)

    try {
      const usersCount = await payload.count({ collection: 'users', overrideAccess: true })
      console.log('  ✓ Admin Panel Users Collection OK! Total Admin Accounts:', usersCount)
    } catch (err: any) {
      console.error('❌ ADMIN PANEL USERS INITIALIZATION ERROR:')
      console.error('  • Error Code:   ', err?.code || 'N/A')
      console.error('  • Error Message:', err?.message)
      console.error('  • Stack Trace:  ', err?.stack)
    }
    console.log('==================================================')
  },
})


