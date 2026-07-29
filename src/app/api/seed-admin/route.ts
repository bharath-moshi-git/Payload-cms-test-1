import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  console.log('==================================================')
  console.log('👤 [SEED ADMIN API] Initializing Admin Account Creation...')
  console.log('==================================================')

  try {
    const payload = await getPayload({ config: configPromise })

    // Step 1: Ensure "users" table exists in Neon PostgreSQL
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
      `)
      console.log('  ✓ Verified/Created "users" table in Neon Postgres')
    }

    // Step 2: Check if any admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
    })

    if (existingUsers.docs.length > 0) {
      const email = existingUsers.docs[0].email
      console.log('  ✓ Admin User already exists in DB:', email)
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists in Neon PostgreSQL.',
        existingAdminEmail: email,
        note: 'You can now log in at /admin/login using your credentials.',
      })
    }

    // Step 3: Create initial Admin User in Neon Postgres
    const newAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@aarde.com',
        password: 'Password123!',
      },
      overrideAccess: true,
    })

    console.log('🎉 INITIAL ADMIN ACCOUNT CREATED SUCCESSFULLY!')
    console.log('  • Admin ID: ', newAdmin.id)
    console.log('  • Email:    admin@aarde.com')
    console.log('  • Password: Password123!')
    console.log('==================================================')

    return NextResponse.json({
      success: true,
      message: 'Initial Admin account created successfully in Neon Postgres!',
      credentials: {
        email: 'admin@aarde.com',
        password: 'Password123!',
      },
      loginUrl: '/admin/login',
    })

  } catch (error: any) {
    console.error('❌ SEED ADMIN ERROR:', error?.message)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to create admin user.',
        details: 'Check Vercel environment variables (DATABASE_URI, PAYLOAD_SECRET).',
      },
      { status: 500 }
    )
  }
}
