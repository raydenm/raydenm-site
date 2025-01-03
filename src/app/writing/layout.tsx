import React, { Suspense } from 'react'

import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { SideMenu } from '@/components/layout/side-menu'
import { WritingListLayout } from '@/components/writing/writing-list-layout'
import { getSortedPosts } from '@/lib/utils'
import { getAllPosts } from '@/services/contentful'

async function fetchData() {
  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  return { sortedPosts }
}

export default async function WritingLayout({ children }: { children: React.ReactNode }) {
  const { sortedPosts } = await fetchData()

  return (
    <>
      <SideMenu title="文章" isInner>
        <Suspense fallback={<ScreenLoadingSpinner />}>
          <WritingListLayout list={sortedPosts} />
        </Suspense>
      </SideMenu>
      {/* lg:bg-dots  */}
      <div className="flex-1">{children}</div>
    </>
  )
}
