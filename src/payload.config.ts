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
    routes: {
      login: '/login',
      logout: '/logout',
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
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
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
    console.log(process.env.VERCEL_URL, "VERCEL_URL")
    console.log('🚀 PAYLOAD CMS & ADMIN PANEL INITIALIZED')
    console.log('  • Connected DB URI:', dbUrl ? dbUrl.replace(/:[^:@]+@/, ':****@') : 'NOT SET')
    console.log('  • SSL Enabled:     ', isNeonOrCloud)
    console.log('  • Server URL:      ', payload.config.serverURL)

    try {
      if (payload.db && payload.db.pool && typeof payload.db.pool.query === 'function') {
        await payload.db.pool.query(`
          CREATE TABLE IF NOT EXISTS "users" (
            "id" serial PRIMARY KEY NOT NULL,
            "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp with time zone DEFAULT now() NOT NULL,
            "email" text NOT NULL,
            "reset_password_token" text,
            "reset_password_expiration" timestamp with time zone,
            "salt" text,
            "hash" text,
            "login_attempts" numeric DEFAULT 0,
            "lock_until" timestamp with time zone
          );

          CREATE TABLE IF NOT EXISTS "users_sessions" (
            "_order" integer NOT NULL DEFAULT 1,
            "id" varchar PRIMARY KEY NOT NULL,
            "_parent_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
            "created_at" timestamp with time zone DEFAULT now() NOT NULL,
            "expires_at" timestamp with time zone NOT NULL
          );

          CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
            "id" serial PRIMARY KEY NOT NULL,
            "global_slug" text,
            "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp with time zone DEFAULT now() NOT NULL
          );

          CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
            "id" serial PRIMARY KEY NOT NULL,
            "order" integer,
            "parent_id" integer NOT NULL,
            "path" text NOT NULL,
            "users_id" integer
          );

          CREATE TABLE IF NOT EXISTS "payload_preferences" (
            "id" serial PRIMARY KEY NOT NULL,
            "key" text,
            "value" jsonb,
            "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp with time zone DEFAULT now() NOT NULL
          );

          CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
            "id" serial PRIMARY KEY NOT NULL,
            "order" integer,
            "parent_id" integer NOT NULL,
            "path" text NOT NULL,
            "users_id" integer
          );

          CREATE TABLE IF NOT EXISTS "payload_migrations" (
            "id" serial PRIMARY KEY NOT NULL,
            "name" text,
            "batch" numeric,
            "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp with time zone DEFAULT now() NOT NULL
          );
        `)
        console.log('  ✓ Verified/Created all Payload Admin System Tables in Neon Postgres!')
      }
    } catch (dbErr: any) {
      console.warn('  ⚠️ Table auto-create check:', dbErr?.message)
    }

    // Auto-seed default page documents if none exist
    const defaultPages = [
      { slug: 'home-page', title: 'Home Page Content' },
      { slug: 'about-page', title: 'About Us Page' },
      { slug: 'contact-page', title: 'Contact Us Page' },
      { slug: 'careers-page', title: 'Careers Page' },
    ]

    for (const pageItem of defaultPages) {
      try {
        const { totalDocs } = await payload.count({ collection: pageItem.slug as any, overrideAccess: true })
        if (totalDocs === 0) {
          await payload.create({
            collection: pageItem.slug as any,
            data: { title: pageItem.title },
            overrideAccess: true,
          })
          console.log(`  ✓ Auto-seeded default document for collection: ${pageItem.slug}`)
        }
      } catch (err: any) {
        console.warn(`  ⚠️ Auto-seed check for ${pageItem.slug}:`, err?.message)
      }
    }

    try {
      const { totalDocs: usersCount } = await payload.count({ collection: 'users', overrideAccess: true })
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



