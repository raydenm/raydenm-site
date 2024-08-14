'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ArrowDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BookmarkCard } from '@/components/bookmarks/bookmark-card'
import { cn } from '@/lib/utils'

export type BookmarkItemType = {
  _id: number
  link: string
  title: string
  excerpt: string
  note: string
  cover: string
  domain: string
}

export type BookmarkItemsType = {
  items: BookmarkItemType[]
  result: true
}

type BookmarkListProps = {
  initialData: any
  id: number
}

export const BookmarkList = ({ initialData, id }: BookmarkListProps) => {
  const [data, setData] = useState(initialData?.result ? initialData?.items : [])
  const [pageIndex, setPageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = () => {
    if (!isReachingEnd && !isLoading) setPageIndex((prevPageIndex) => prevPageIndex + 1)
  }

  const getBookmarkItems = async (id: number, pageIndex = 0) => {
    try {
      const response = await fetch(
        `https://api.raindrop.io/rest/v1/raindrops/${id}?` +
          new URLSearchParams({
            page: String(pageIndex),
            perpage: '30',
            time: String(Date.now()),
            sort: 'created'
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN}`
          }
        }
      )
      const data: BookmarkItemsType = await response.json()
      return data
    } catch (error) {
      console.info(error)
      return null
    }
  }

  const fetchInfiniteData = useCallback(async () => {
    setIsLoading(true)
    const newData = await getBookmarkItems(id, pageIndex)
    if (newData?.result) setData((prevData: any) => [...prevData, ...newData.items])
    setIsLoading(false)
  }, [id, pageIndex])

  useEffect(() => {
    if (pageIndex > 0) fetchInfiniteData()
  }, [pageIndex, fetchInfiniteData])

  const getChunks = useCallback(() => {
    const firstChunk: any[] = []
    const lastChunk: any[] = []
    data.forEach((element: any, index: number) => {
      if (index % 2 === 0) {
        firstChunk.push(element)
      } else {
        lastChunk.push(element)
      }
    })
    return [[...firstChunk], [...lastChunk]]
  }, [data])

  const chunks = useMemo(() => getChunks(), [getChunks])
  const isReachingEnd = data.length >= initialData?.count ?? 0
  const isTweetCollection = false

  return (
    <div>
      <div className="flex flex-col gap-4 @lg:hidden">
        {
          // @ts-ignore
          data.map((bookmark, bookmarkIndex) => {
            return (
              <div
                key={`bookmark_${bookmarkIndex}`}
                className={cn('grid gap-4', isTweetCollection ? 'h-fit' : 'place-content-start')}
              >
                <BookmarkCard key={bookmark._id} bookmark={bookmark} order={bookmarkIndex} />
              </div>
            )
          })
        }
      </div>
      <div className="hidden @lg:grid @lg:grid-cols-2 @lg:gap-4">
        {chunks.map((chunk, chunkIndex) => {
          return (
            <div
              key={`chunk_${chunkIndex}`}
              className={cn('grid gap-4', isTweetCollection ? 'h-fit' : 'place-content-start')}
            >
              {chunk.map((bookmark, bookmarkIndex) => {
                return <BookmarkCard key={bookmark._id} bookmark={bookmark} order={bookmarkIndex} />
              })}
            </div>
          )
        })}
      </div>
      {data.length > 0 ? (
        <div className="mt-8 flex min-h-16 items-center justify-center text-sm lg:mt-12">
          {!isReachingEnd ? (
            <>
              {isLoading ? (
                <div
                  className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">加载中...</span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoading}
                  className="w-full justify-center bg-white"
                >
                  加载更多
                  <ArrowDownIcon size={16} />
                </Button>
              )}
            </>
          ) : (
            <span>已加载全部</span>
          )}
        </div>
      ) : (
        <div className="mt-8 flex min-h-16 flex-col items-center justify-center lg:mt-12">
          <span>暂无标签</span>
        </div>
      )}
    </div>
  )
}
