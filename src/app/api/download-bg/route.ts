import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const copyJs = path.join(process.cwd(), 'public', 'copy.js')
    const dummyTxt = path.join(process.cwd(), 'public', 'dummy.txt')
    if (fs.existsSync(copyJs)) fs.unlinkSync(copyJs)
    if (fs.existsSync(dummyTxt)) fs.unlinkSync(dummyTxt)
    return NextResponse.json({ success: true, message: 'Cleaned up public files successfully' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}
