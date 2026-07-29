import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message fields are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        phone: phone || '',
        subject: subject || 'General Inquiry',
        message,
      },
      overrideAccess: true,
    })

    console.log('==================================================')
    console.log('📥 NEW CONTACT SUBMISSION SAVED TO DATABASE:')
    console.log('  ID:        ', submission.id)
    console.log('  Name:      ', submission.name)
    console.log('  Email:     ', submission.email)
    console.log('  Phone:     ', submission.phone || 'N/A')
    console.log('  Subject:   ', submission.subject)
    console.log('  Message:   ', submission.message)
    console.log('  Timestamp: ', submission.createdAt)
    console.log('==================================================')

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      submissionId: submission.id,
    })

  } catch (error: any) {
    console.error('Error saving contact submission:', error)
    
    // Provide a helpful error message while avoiding raw database internal dump if DB is reconnecting
    const userErrorMessage = error?.message?.includes('Failed query')
      ? 'Database is syncing tables. Please try submitting again in a moment.'
      : error?.message || 'Failed to submit form inquiry.'

    return NextResponse.json(
      { error: userErrorMessage },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const submissions = await payload.find({
      collection: 'contact-submissions',
      limit: 100,
      overrideAccess: true,
    })

    console.log('==================================================')
    console.log(`📋 FETCHED ${submissions.docs.length} CONTACT SUBMISSIONS FROM DATABASE:`)
    console.dir(submissions.docs, { depth: null })
    console.log('==================================================')

    return NextResponse.json({
      success: true,
      totalDocs: submissions.totalDocs,
      submissions: submissions.docs,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch contact submissions.' },
      { status: 500 }
    )
  }
}


