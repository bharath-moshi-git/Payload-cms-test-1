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
    })

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      submissionId: submission.id,
    })
  } catch (error: any) {
    console.error('Error saving contact submission:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to submit form inquiry.' },
      { status: 500 }
    )
  }
}
