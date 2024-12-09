import { Suspense } from 'react'

import { FloatingHeader } from '@/components/common/floating-header'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { ScrollArea } from '@/components/common/scroll-area'
import { WritingListLayout } from '@/components/writing/writing-list-layout'
import { getSortedPosts } from '@/lib/utils'
import { getAllPosts } from '@/services/contentful'

async function fetchData() {
  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  return { sortedPosts }
}

export default async function Writing() {
  const { sortedPosts } = await fetchData()

  return (
    <ScrollArea className="lg:hidden">
      <FloatingHeader title="文章" />
      <Suspense fallback={<ScreenLoadingSpinner />}>
        <WritingListLayout list={sortedPosts} isMobile />
      </Suspense>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const title = `${process.env.NEXT_PUBLIC_WEBSITE_USERNAME}-文章`
  const description = '文章'
  const siteUrl = '/writing'

  return {
    title,
    description,
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
