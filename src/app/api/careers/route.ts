import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

async function ensureCareerTables(payload: any) {
  try {
    if (payload.db && payload.db.pool && typeof payload.db.pool.query === 'function') {
      await payload.db.pool.query(`
        CREATE TABLE IF NOT EXISTS "media" (
          "id" serial PRIMARY KEY NOT NULL,
          "alt" text NOT NULL,
          "filename" text,
          "mimeType" text,
          "filesize" numeric,
          "width" numeric,
          "height" numeric,
          "focalX" numeric,
          "focalY" numeric,
          "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
          "created_at" timestamp with time zone DEFAULT now() NOT NULL
        );

        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "filename" text;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "mimeType" text;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "filesize" numeric;

        CREATE TABLE IF NOT EXISTS "career_applications" (
          "id" serial PRIMARY KEY NOT NULL,
          "name" text NOT NULL,
          "email" text NOT NULL,
          "phone" text NOT NULL,
          "position" text NOT NULL,
          "resume_id" integer,
          "cover_letter" text,
          "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
          "created_at" timestamp with time zone DEFAULT now() NOT NULL
        );
      `)
    }
  } catch (err) {
    console.warn('Could not auto-create career tables:', err)
  }
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const coverLetter = (formData.get('coverLetter') as string) || ''
    const cvFile = formData.get('cv') as File | null

    if (!name || !email || !phone || !position || !cvFile) {
      return NextResponse.json(
        { error: 'Name, email, phone, position, and CV file are required.' },
        { status: 400 }
      )
    }

    // Ensure upload directory exists on Vercel / serverless (/tmp)
    const targetDir = Boolean(process.env.VERCEL || process.env.NODE_ENV === 'production')
      ? '/tmp'
      : path.resolve('media')

    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }
    } catch (fsErr) {
      console.warn('Directory check warning:', fsErr)
    }

    const payload = await getPayload({ config: configPromise })



    // Step 1: Upload the CV file to Payload Media collection
    const bytes = await cvFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let mediaDoc: any
    try {
      mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `CV Resume - ${name} - ${position}`,
        },
        file: {
          data: buffer,
          name: cvFile.name,
          mimetype: cvFile.type || 'application/pdf',
          size: cvFile.size,
        },
        overrideAccess: true,
      })
    } catch (err: any) {
      console.warn('Media upload creation failed, attempting table auto-creation...', err?.message)
      await ensureCareerTables(payload)

      mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `CV Resume - ${name} - ${position}`,
        },
        file: {
          data: buffer,
          name: cvFile.name,
          mimetype: cvFile.type || 'application/pdf',
          size: cvFile.size,
        },
        overrideAccess: true,
      })
    }

    // Step 2: Create career application document referencing uploaded resume media ID
    let application: any
    try {
      application = await payload.create({
        collection: 'career-applications',
        data: {
          name,
          email,
          phone,
          position,
          resume: mediaDoc.id,
          coverLetter,
        },
        overrideAccess: true,
      })
    } catch (err: any) {
      console.warn('Career application creation failed, attempting table auto-creation...', err?.message)
      await ensureCareerTables(payload)

      application = await payload.create({
        collection: 'career-applications',
        data: {
          name,
          email,
          phone,
          position,
          resume: mediaDoc.id,
          coverLetter,
        },
        overrideAccess: true,
      })
    }

    console.log('==================================================')
    console.log('💼 NEW CAREER APPLICATION SAVED TO DATABASE:')
    console.log('  ID:           ', application.id)
    console.log('  Applicant Name:', application.name)
    console.log('  Email:        ', application.email)
    console.log('  Phone:        ', application.phone)
    console.log('  Position:     ', application.position)
    console.log('  Resume ID:    ', mediaDoc.id)
    console.log('  Resume URL:   ', mediaDoc.url)
    console.log('  Cover Letter: ', application.coverLetter || 'N/A')
    console.log('  Timestamp:    ', application.createdAt)
    console.log('==================================================')

    return NextResponse.json({
      success: true,
      message: 'Application and CV uploaded successfully!',
      applicationId: application.id,
      resumeUrl: mediaDoc.url,
    })

  } catch (error: any) {
    console.error('Error processing career application:', error)

    return NextResponse.json(
      { error: error?.message || 'Failed to process job application.' },
      { status: 500 }
    )
  }
}


export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const applications = await payload.find({
      collection: 'career-applications',
      limit: 100,
      overrideAccess: true,
    })

    console.log('==================================================')
    console.log(`📋 FETCHED ${applications.docs.length} CAREER APPLICATIONS FROM DATABASE:`)
    console.dir(applications.docs, { depth: null })
    console.log('==================================================')

    return NextResponse.json({
      success: true,
      totalDocs: applications.totalDocs,
      applications: applications.docs,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch career applications.' },
      { status: 500 }
    )
  }
}


