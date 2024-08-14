import React, { Suspense } from 'react'
import { SideMenu } from '@/components/layout/side-menu'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { ListItem } from '@/components/bookmarks/list-item'
import { Toaster } from '@/components/ui/sonner'
import { getBookmarks } from '@/lib/raindrop'

async function fetchData() {
  const bookmarks = await getBookmarks()
  return { bookmarks }
}

export default async function BookmarksLayout({ children }: { children: React.ReactNode }) {
  const { bookmarks } = await fetchData()

  return (
    <>
      <div className="flex w-full">
        <SideMenu title="书签" bookmarks={bookmarks} isInner>
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <div className="flex flex-col gap-1 text-sm">
              {bookmarks?.map((bookmark) => {
                return (
                  <ListItem
                    key={bookmark._id}
                    path={`/bookmarks/${bookmark.slug}`}
                    title={bookmark.title}
                    description={`${bookmark.count}个书签`}
                  />
                )
              })}
            </div>
          </Suspense>
        </SideMenu>
        <div className="lg:bg-grid flex-1">{children}</div>
      </div>
      <Toaster
        closeButton
        richColors
        toastOptions={{
          duration: 5000
        }}
      />
    </>
  )
}

export const viewport = {
  maximumScale: 1
}
