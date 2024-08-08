import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/common/scroll-area'
import { FloatingHeader } from '@/components/common/floating-header'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { getBookmarks } from '@/lib/raindrop'
// import { sortByProperty } from '@/lib/utils'

async function fetchData() {
  const bookmarks = await getBookmarks()
  // const sortedBookmarks = sortByProperty(bookmarks, 'title')
  return { bookmarks }
}

export default async function Writing() {
  const { bookmarks } = await fetchData()

  return (
    <ScrollArea className="lg:hidden">
      <FloatingHeader title="Bookmarks" bookmarks={bookmarks} />
      <Suspense fallback={<ScreenLoadingSpinner />}>
        {bookmarks?.map((bookmark) => {
          return (
            <Link
              key={bookmark._id}
              href={`/bookmarks/${bookmark.slug}`}
              className="flex flex-col gap-1 border-b px-4 py-3 text-sm hover:bg-gray-100"
            >
              <span className="font-medium">{bookmark.title}</span>
              <span className="text-slate-500">{bookmark.count} bookmarks</span>
            </Link>
          )
        })}
      </Suspense>
    </ScrollArea>
  )
}
