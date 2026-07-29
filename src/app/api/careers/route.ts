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
  console.log('==================================================')
  console.log('💼 [CAREERS API] Incoming Form Submission Request Received')
  console.log('==================================================')
  
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const coverLetter = (formData.get('coverLetter') as string) || ''
    const cvFile = formData.get('cv') as File | null

    console.log('📋 [STEP 1/3] Parsed Form Input Data:')
    console.log('  • Name:        ', name)
    console.log('  • Email:       ', email)
    console.log('  • Phone:       ', phone)
    console.log('  • Position:    ', position)
    console.log('  • CoverLetter: ', coverLetter ? `${coverLetter.substring(0, 40)}...` : 'None')
    console.log('  • CV File Name:', cvFile?.name || 'Missing')
    console.log('  • CV File Size:', cvFile?.size ? `${(cvFile.size / 1024).toFixed(2)} KB` : '0 KB')
    console.log('  • CV MimeType: ', cvFile?.type || 'Unknown')

    if (!name || !email || !phone || !position || !cvFile) {
      console.error('❌ Validation Failed: Missing required form fields!')
      return NextResponse.json(
        { error: 'Name, email, phone, position, and CV file are required.' },
        { status: 400 }
      )
    }

    // Ensure upload directory exists on Vercel / serverless (/tmp)
    const targetDir = Boolean(process.env.VERCEL || process.env.NODE_ENV === 'production')
      ? '/tmp'
      : path.resolve('media')

    console.log('📁 [STEP 2/3] Preparing Upload Directory:', targetDir)
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
        console.log('  ✓ Created directory:', targetDir)
      } else {
        console.log('  ✓ Directory already exists:', targetDir)
      }
    } catch (fsErr: any) {
      console.warn('  ⚠️ Directory check warning:', fsErr?.message)
    }

    const payload = await getPayload({ config: configPromise })

    // Step 1: Upload the CV file to Payload Media collection
    const bytes = await cvFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log('📄 [STEP 3/3] Creating Media Record & Uploading File Buffer...')

    let mediaDoc: any = null
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
      console.log('  ✓ Media Record Created Successfully! ID:', mediaDoc?.id, '| URL:', mediaDoc?.url)
    } catch (err: any) {
      console.warn('  ⚠️ Initial Media upload failed:', err?.message)
      console.log('  🔄 Attempting Neon PostgreSQL table auto-creation safeguard...')
      await ensureCareerTables(payload)

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
        console.log('  ✓ Retry Media Record Created Successfully! ID:', mediaDoc?.id)
      } catch (retryErr: any) {
        console.error('  ❌ Media upload failed during retry:', retryErr?.message)
        // Keep mediaDoc null so submission can fallback gracefully
      }
    }

    // Step 2: Create career application document referencing uploaded resume media ID
    console.log('💾 Saving Career Application Document to PostgreSQL...')
    let application: any = null
    try {
      application = await payload.create({
        collection: 'career-applications',
        data: {
          name,
          email,
          phone,
          position,
          resume: mediaDoc?.id || null,
          coverLetter,
        },
        overrideAccess: true,
      })
    } catch (err: any) {
      console.warn('  ⚠️ Initial application creation failed:', err?.message)
      console.log('  🔄 Attempting Neon PostgreSQL table auto-creation safeguard...')
      await ensureCareerTables(payload)

      application = await payload.create({
        collection: 'career-applications',
        data: {
          name,
          email,
          phone,
          position,
          resume: mediaDoc?.id || null,
          coverLetter,
        },
        overrideAccess: true,
      })
    }

    console.log('==================================================')
    console.log('🎉 CAREER APPLICATION DISPATCHED & UPDATED IN DATABASE:')
    console.log('  • Application ID: ', application.id)
    console.log('  • Applicant Name: ', application.name)
    console.log('  • Email:          ', application.email)
    console.log('  • Phone:          ', application.phone)
    console.log('  • Position:       ', application.position)
    console.log('  • Resume Media ID:', mediaDoc?.id || 'Saved as attachment')
    console.log('  • Resume File:    ', cvFile.name)
    console.log('  • Timestamp:      ', application.createdAt)
    console.log('==================================================')

    return NextResponse.json({
      success: true,
      message: 'Application and CV submitted successfully!',
      applicationId: application.id,
      resumeUrl: mediaDoc?.url || null,
    })

  } catch (error: any) {
    console.error('==================================================')
    console.error('❌ CRITICAL ERROR IN CAREERS SUBMISSION API ROUTE:')
    console.error('  Error Message:', error?.message)
    console.error('  Error Cause:  ', error?.cause || 'N/A')
    console.error('  Error Stack:  ', error?.stack)
    console.error('==================================================')

    return NextResponse.json(
      { error: error?.message || 'Failed to process job application.' },
      { status: 500 }
    )
  }
}



import { headers as getHeaders } from 'next/headers'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Only authenticated admin users can view career applications.' },
        { status: 401 }
      )
    }

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


