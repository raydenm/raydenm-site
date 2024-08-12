'use client'

import { useEffect, useState, useCallback } from 'react'
import { ArrowDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import supabase from '@/lib/supabase/public'
import { PhotoCard } from '@/components/photo/photo-card'

export type phoneItem = {
  url: string
  id: string
  created_at: Date
  description: string
}

export const PhotoList = ({ initData }: { initData: { data: phoneItem[]; count: number } }) => {
  const [data, setData] = useState(initData.data)
  const [pageIndex, setPageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(initData.count)
  const pageSize = 30

  const loadMore = () => {
    if (!isReachingEnd && !isLoading) setPageIndex((prevPageIndex) => prevPageIndex + 1)
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const start = pageIndex * pageSize
    const end = start + pageSize - 1
    const { data, count } = await supabase.from('image_list').select('*', { count: 'exact' }).range(start, end)
    if (data) setData((prevData: phoneItem[]) => [...prevData, ...data])
    if (count) setCount(count)
    setIsLoading(false)
  }, [pageIndex])

  useEffect(() => {
    if (pageIndex > 0) fetchData()
  }, [pageIndex, fetchData])

  const isReachingEnd = data.length >= initData?.count ?? 0

  return (
    <div>
      {/* <div className="flex flex-col gap-4 @lg:hidden">

      </div> */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((photo, index) => {
          return <PhotoCard key={index} photo={photo} />
        })}
      </div>
      {/* {data.length > 0 ? (
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
          <span>暂无图片</span>
        </div>
      )} */}
    </div>
  )
}
