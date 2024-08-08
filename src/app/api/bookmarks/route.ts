import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

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

// import { NextResponse } from 'next/server'

// import supabase from '@/lib/supabase/private'

// export async function POST(request) {
//   const searchParams = request.nextUrl.searchParams
//   const slug = searchParams.get('slug')
//   if (!slug) return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })

//   try {
//     const { data: categorie } = await supabase.from('categories').select('*').eq('slug', slug).single()
//     const { data: bookmarkItems } = await supabase
//       .from('bookmarks')
//       .select('*')
//       .eq('category_id', categorie.id)
//       .range(0, 9)
//     const { count: totalCount } = await supabase
//       .from('bookmarks')
//       .select('*', { count: 'exact', head: true })
//       .eq('category_id', categorie.id)
//     const result = {
//       currentBookmark: categorie,
//       bookmarkItems,
//       totalCount
//     }
//     return NextResponse.json(result, { status: 200 })
//   } catch (error) {
//     console.error('Error incrementing view count:', error)
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }
