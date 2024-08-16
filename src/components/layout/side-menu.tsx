'use client'

import dynamic from 'next/dynamic'
import { useRouter, usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/common/scroll-area'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { useKeyPress } from '@/hooks/useKeyPress'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BookmarksType } from '@/lib/raindrop'
import { keyCodePathnameMapping } from '@/config/path'

import useStore from '@/store/index'
const SubmitBookmarkDialog = dynamic(
  () => import('@/components/bookmarks/submit-bookmark/dialog').then((mod) => mod.SubmitBookmarkDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

type SideMenuProps = {
  children: React.ReactNode
  title?: string
  bookmarks?: BookmarksType
  isInner?: boolean
}

export const SideMenu = ({ children, title, bookmarks = [], isInner }: SideMenuProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const editing = useStore((state) => state.editing)

  useKeyPress(onKeyPress, Object.keys(keyCodePathnameMapping))

  function onKeyPress(event: { code: any }) {
    if (editing) return
    const key = event.code
    const targetPathname = keyCodePathnameMapping[key]
    if (targetPathname && targetPathname !== pathname) router.push(targetPathname)
  }

  const isBookmarksPath = pathname.startsWith('/bookmarks')
  const currentBookmark = bookmarks.find((bookmark) => `/bookmarks/${bookmark.slug}` === pathname)

  return (
    <ScrollArea
      className={cn(
        'hidden lg:flex lg:flex-col lg:border-r lg:border-muted',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b border-muted px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">{title}</span>
            <div className="flex items-center gap-2">
              {isBookmarksPath && <SubmitBookmarkDialog bookmarks={bookmarks} currentBookmark={currentBookmark} />}
            </div>
          </div>
        </div>
      )}
      <div className="p-3">{children}</div>
    </ScrollArea>
  )
}
