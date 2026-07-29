import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  console.log('==================================================')
  console.log('👤 [SEED ADMIN API] Initializing Admin Account Creation...')
  console.log('==================================================')

  try {
    const payload = await getPayload({ config: configPromise })

    // Step 1: Ensure "users" and "users_sessions" tables exist in Neon PostgreSQL
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
      `)
      console.log('  ✓ Verified/Created "users" and "users_sessions" tables in Neon Postgres')
    }

    // Step 2: Direct DB query to check if admin user exists
    let existingUsersCount = 0
    try {
      if (payload.db && payload.db.pool && typeof payload.db.pool.query === 'function') {
        const res = await payload.db.pool.query('SELECT count(*)::int as count FROM "users"')
        existingUsersCount = res.rows[0]?.count || 0
      }
    } catch (e) {
      console.warn('Direct count failed, falling back to payload.find:', e)
    }

    if (existingUsersCount > 0) {
      console.log('  ✓ Admin User already exists in DB! Total count:', existingUsersCount)
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists in Neon PostgreSQL.',
        adminEmail: 'admin@aarde.com',
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
