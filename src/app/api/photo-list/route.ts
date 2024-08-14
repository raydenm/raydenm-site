import { NextResponse } from 'next/server'

import supabase from '@/lib/supabase/public'

export const runtime = 'edge'

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url)
  const searchParams = parsedUrl.searchParams
  const pageIndex = Number(searchParams.get('pageIndex'))
  const pageSize = Number(searchParams.get('pageSize'))
  const start = pageIndex * pageSize
  const end = start + pageSize - 1

  try {
    const res = await supabase.from('image_list').select('*', { count: 'exact' }).range(start, end)
    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    // @ts-ignore
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
