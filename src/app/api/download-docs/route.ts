import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'TECHNICAL_DOCUMENTATION.md')
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': 'attachment; filename="AARDE_Projects_Technical_Documentation.md"',
      },
    })
  } catch (error) {
    console.error('Error downloading docs:', error)
    return NextResponse.json({ error: 'Failed to download documentation' }, { status: 500 })
  }
}
