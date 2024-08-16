import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { ScrollArea } from '@/components/common/scroll-area'
import { PageTitle } from '@/components/layout/page-title'
import { FloatingHeader } from '@/components/common/floating-header'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { BookmarkList } from '@/components/bookmarks/bookmark-list'
import { getBookmarkItems, getBookmarks } from '@/lib/raindrop'

export async function generateStaticParams() {
  const bookmarks = await getBookmarks()
  return bookmarks.map((bookmark) => ({ slug: bookmark.slug }))
}

async function fetchData(slug: string) {
  const bookmarks = await getBookmarks()
  const currentBookmark = (bookmarks || []).find((bookmark) => bookmark.slug === slug)
  if (!currentBookmark) notFound()

  const bookmarkItems = await getBookmarkItems(currentBookmark._id)

  return {
    bookmarks,
    currentBookmark,
    bookmarkItems
  }
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { bookmarks, currentBookmark, bookmarkItems } = await fetchData(slug)

  return (
    <ScrollArea className="bg-grid" useScrollAreaId>
      <FloatingHeader
        scrollTitle={currentBookmark.title}
        goBackLink="/bookmarks"
        bookmarks={bookmarks}
        currentBookmark={currentBookmark}
      />
      <div className="content-wrapper">
        <div className="content @container">
          <PageTitle title={currentBookmark.title} />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <BookmarkList id={currentBookmark._id} initialData={bookmarkItems} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params

  const siteUrl = `/bookmarks/${slug}`
  const title = `${process.env.NEXT_PUBLIC_WEBSITE_USERNAME}-书签`
  const description = '书签'

  return {
    title,
    description,
    keywords: [title, description],
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
