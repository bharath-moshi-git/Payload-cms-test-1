import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  console.log('==================================================')
  console.log('🔍 [ADMIN DIAGNOSTICS] Running Admin Panel & Database Health Check...')
  console.log('==================================================')

  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    isVercel: Boolean(process.env.VERCEL),
    hasDatabaseUri: Boolean(process.env.DATABASE_URI || process.env.DATABASE_URL),
    hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET),
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL || 'http://localhost:3000',
    checks: {},
  }

  // Check 1: Environment Variables
  console.log('📋 [CHECK 1/5] Verifying Environment Variables:')
  console.log('  • NODE_ENV:          ', process.env.NODE_ENV)
  console.log('  • VERCEL:            ', Boolean(process.env.VERCEL))
  console.log('  • DATABASE_URI Set:  ', Boolean(process.env.DATABASE_URI))
  console.log('  • DATABASE_URL Set:  ', Boolean(process.env.DATABASE_URL))
  console.log('  • PAYLOAD_SECRET Set:', Boolean(process.env.PAYLOAD_SECRET))

  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    const msg = 'CRITICAL ERROR: Neither DATABASE_URI nor DATABASE_URL environment variable is set!'
    console.error('❌', msg)
    diagnostics.checks.environment = { status: 'FAILED', error: msg }
    return NextResponse.json(diagnostics, { status: 500 })
  }
  diagnostics.checks.environment = { status: 'PASSED' }

  // Check 2: Payload Initialization
  let payload: any = null
  console.log('🚀 [CHECK 2/5] Initializing Payload Engine...')
  try {
    payload = await getPayload({ config: configPromise })
    console.log('  ✓ Payload engine initialized successfully!')
    diagnostics.checks.payloadInit = { status: 'PASSED' }
  } catch (err: any) {
    console.error('❌ PAYLOAD INIT FAILED!')
    console.error('  • Error Name:   ', err?.name)
    console.error('  • Error Code:   ', err?.code || 'N/A')
    console.error('  • Error Message:', err?.message)
    console.error('  • Stack Trace:  ', err?.stack)
    
    diagnostics.checks.payloadInit = {
      status: 'FAILED',
      errorName: err?.name,
      errorCode: err?.code,
      errorMessage: err?.message,
    }
    return NextResponse.json(diagnostics, { status: 500 })
  }

  // Check 3: Raw PostgreSQL Pool & Table Inspection
  console.log('🗄️ [CHECK 3/5] Testing PostgreSQL Database Connection & Tables:')
  try {
    if (payload?.db?.pool) {
      const ping = await payload.db.pool.query('SELECT NOW() as current_time')
      console.log('  ✓ PostgreSQL Connection Alive! Server Time:', ping.rows[0]?.current_time)

      const tables = await payload.db.pool.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      )
      const tableNames = tables.rows.map((r: any) => r.table_name)
      console.log('  ✓ Existing PostgreSQL Tables in DB:', tableNames)
      diagnostics.checks.postgresTables = { status: 'PASSED', tables: tableNames }
    } else {
      console.warn('  ⚠️ Direct DB pool object not accessible, using Payload adapter query.')
      diagnostics.checks.postgresTables = { status: 'WARNED', message: 'Pool not directly attached' }
    }
  } catch (err: any) {
    console.error('❌ POSTGRESQL CONNECTION / TABLE QUERY FAILED!')
    console.error('  • Error Code:   ', err?.code)
    console.error('  • Error Message:', err?.message)
    console.error('  • Stack Trace:  ', err?.stack)

    diagnostics.checks.postgresTables = {
      status: 'FAILED',
      errorCode: err?.code,
      errorMessage: err?.message,
    }
  }

  // Check 4: Admin Users Collection Check
  console.log('👤 [CHECK 4/5] Checking Admin Users Collection ("users"):')
  try {
    const userCount = await payload.count({ collection: 'users', overrideAccess: true })
    console.log('  ✓ Users Collection Readable! Total Admin Users:', userCount)
    diagnostics.checks.adminUsers = { status: 'PASSED', count: userCount }
  } catch (err: any) {
    console.error('❌ ADMIN USERS COLLECTION QUERY FAILED!')
    console.error('  • Error Name:   ', err?.name)
    console.error('  • Error Code:   ', err?.code)
    console.error('  • Error Message:', err?.message)
    console.error('  • Stack Trace:  ', err?.stack)

    diagnostics.checks.adminUsers = {
      status: 'FAILED',
      errorName: err?.name,
      errorMessage: err?.message,
    }
  }

  // Check 5: Collections Readability Check
  console.log('📦 [CHECK 5/5] Verifying Form Collections & Media:')
  const collectionsToTest = ['contact-submissions', 'career-applications', 'media']
  diagnostics.checks.collections = {}

  for (const slug of collectionsToTest) {
    try {
      const count = await payload.count({ collection: slug, overrideAccess: true })
      console.log(`  ✓ Collection '${slug}': OK (${count} entries)`)
      diagnostics.checks.collections[slug] = { status: 'PASSED', count }
    } catch (err: any) {
      console.error(`  ❌ Collection '${slug}' FAILED:`, err?.message)
      diagnostics.checks.collections[slug] = { status: 'FAILED', error: err?.message }
    }
  }

  console.log('==================================================')
  console.log('🏁 [ADMIN DIAGNOSTICS COMPLETE] Summary:', diagnostics.checks)
  console.log('==================================================')

  return NextResponse.json(diagnostics, { status: 200 })
}
