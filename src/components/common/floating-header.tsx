'use client'

import React, { memo, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import {
  ArrowLeftIcon
  // RadioIcon
} from 'lucide-react'
import type { BookmarksType, BookmarkType } from '@/lib/raindrop'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { SCROLL_AREA_ID, MOBILE_SCROLL_THRESHOLD } from '@/config'
const MobileDrawer = dynamic(() => import('@/components/common/mobile-drawer').then((mod) => mod.MobileDrawer))
const SubmitBookmarkDrawer = dynamic(
  () => import('@/components/bookmarks/submit-bookmark/drawer').then((mod) => mod.SubmitBookmarkDrawer),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

type FloatingHeaderProps = {
  scrollTitle?: string
  title?: string
  goBackLink?: string
  bookmarks?: BookmarksType
  currentBookmark?: BookmarkType
  children?: React.ReactNode
}

export const FloatingHeader = memo(
  ({ scrollTitle, title, goBackLink, bookmarks = [], currentBookmark, children }: FloatingHeaderProps) => {
    const [transformValues, setTransformValues] = useState({ translateY: 0, opacity: scrollTitle ? 0 : 1 })
    const pathname = usePathname()
    // const isWritingIndexPage = pathname === '/writing'
    const isWritingPath = pathname.startsWith('/writing')
    // const isBookmarksIndexPage = pathname === '/bookmarks'
    const isBookmarkPath = pathname.startsWith('/bookmarks')

    useEffect(() => {
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

      const onScroll = (e: { target: { scrollTop: any } }) => {
        const scrollY = e.target.scrollTop

        const translateY = Math.max(100 - scrollY, 0)
        const adjustedScroll =
          (scrollY - MOBILE_SCROLL_THRESHOLD * (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) / 100
        const result = parseFloat(adjustedScroll.toFixed(2))

        const opacity = Math.min(Math.max(result, 0), 1)

        setTransformValues({ translateY, opacity })
      }

      if (scrollTitle) {
        // @ts-ignore
        scrollAreaElem?.addEventListener('scroll', onScroll, {
          passive: true
        })
      }
      // @ts-ignore
      return () => scrollAreaElem?.removeEventListener('scroll', onScroll)
    }, [scrollTitle])

    return (
      <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-white text-sm font-medium lg:hidden">
        <div className="flex size-full items-center px-3">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-1">
              {goBackLink ? (
                <Button variant="ghost" size="icon" className="shrink-0" asChild>
                  <Link href={goBackLink} title="Go back">
                    <ArrowLeftIcon size={16} />
                  </Link>
                </Button>
              ) : (
                <MobileDrawer />
              )}
              <div className="flex flex-1 items-center justify-between">
                {scrollTitle && (
                  <span
                    className="line-clamp-2 font-semibold tracking-tight"
                    style={{
                      transform: `translateY(${transformValues.translateY}%)`,
                      opacity: transformValues.opacity
                    }}
                  >
                    {scrollTitle}
                  </span>
                )}
                {title && (
                  <Balancer ratio={0.35}>
                    <span className="line-clamp-2 font-semibold tracking-tight">{title}</span>
                  </Balancer>
                )}
                <div className="flex items-center gap-2">
                  {isBookmarkPath && <SubmitBookmarkDrawer bookmarks={bookmarks} currentBookmark={currentBookmark} />}
                </div>
              </div>
            </div>
            {/* This is a hack to show writing views with framer motion reveal effect */}
            {scrollTitle && isWritingPath && <div className="flex min-w-[50px] justify-end">{children}</div>}
          </div>
        </div>
      </header>
    )
  }
)
