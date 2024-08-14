import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { isDevelopment } from '@/lib/utils'

export const runtime = !isDevelopment ? 'edge' : 'nodejs'

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url)
  const searchParams = parsedUrl.searchParams
  const secret = searchParams.get('secret')

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const slug = searchParams.get('slug')
  draftMode().enable()
  redirect(slug ?? '/')
}
