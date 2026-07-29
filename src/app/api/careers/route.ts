import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

    const payload = await getPayload({ config: configPromise })

    // Step 1: Upload the CV file to Payload Media collection
    const bytes = await cvFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const mediaDoc = await payload.create({
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

    // Step 2: Create career application document referencing uploaded resume media ID
    const application = await payload.create({
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

    const userErrorMessage = error?.message?.includes('Failed query')
      ? 'Database is syncing tables. Please try submitting again in a moment.'
      : error?.message || 'Failed to process job application.'

    return NextResponse.json(
      { error: userErrorMessage },
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


