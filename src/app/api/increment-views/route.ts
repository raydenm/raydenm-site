import { NextResponse } from 'next/server'

import supabase from '@/lib/supabase/private'
// import { isDevelopment } from '@/lib/utils'

export async function GET(request: Request) {
  // if (isDevelopment) return NextResponse.json({ error: 'Not available in development' }, { status: 400 })

  const parsedUrl = new URL(request.url)
  const searchParams = parsedUrl.searchParams
  const slug = searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })

  try {
    await supabase.rpc('increment_view_count', { page_slug: slug })
    console.log('increment_view_count')
    return NextResponse.json({ messsage: `View count incremented successfully for slug: ${slug}` }, { status: 200 })
  } catch (error) {
    console.error('Error incrementing view count:', error)
    // @ts-ignore
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
