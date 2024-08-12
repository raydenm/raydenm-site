import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export const runtime = 'edge'

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url)
  const searchParams = parsedUrl.searchParams
  const secret = searchParams.get('secret')

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  draftMode().disable()
  return NextResponse.json({ messsage: 'Draft mode is disabled successfully', now: Date.now() }, { status: 200 })
}
