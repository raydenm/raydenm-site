'use client'

import dynamic from 'next/dynamic'
import { useRouter, usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/common/scroll-area'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { useKeyPress } from '@/hooks/useKeyPress'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BookmarksType } from '@/lib/raindrop'

import useStore from '@/store/index'
const SubmitBookmarkDialog = dynamic(
  () => import('@/components/bookmarks/submit-bookmark/dialog').then((mod) => mod.SubmitBookmarkDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

const keyCodePathnameMapping: { [key: string]: string } = {
  Digit1: '/',
  Digit2: '/writing',
  Digit3: '/journey',
  Digit4: '/stack',
  Digit5: '/project',
  Digit6: '/bookmarks',
  Digit7: '/photo'
}

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
        'hidden bg-zinc-50 lg:flex lg:flex-col lg:border-r',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">{title}</span>
            <div className="flex items-center gap-2">
              {isBookmarksPath && <SubmitBookmarkDialog bookmarks={bookmarks} currentBookmark={currentBookmark} />}
            </div>
          </div>
        </div>
      )}
      <div className="bg-zinc-50 p-3">{children}</div>
    </ScrollArea>
  )
}
