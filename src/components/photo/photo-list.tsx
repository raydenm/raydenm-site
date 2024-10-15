'use client'

import { useEffect, useState, useCallback } from 'react'
import { ArrowDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PhotoCard } from '@/components/photo/photo-card'
import { getPhotoList } from '@/services/supabase/photo'
import { LoadingSpinner } from '@/components/common/loading-spinner'

import 'react-photo-view/dist/react-photo-view.css'

import { PhotoProvider, PhotoView } from 'react-photo-view'

export type photoItem = {
  url: string
  id: string
  created_at: Date
  description: string
}
export const PhotoList = ({ initialData }: { initialData: any }) => {
  const [data, setData] = useState<photoItem[]>(initialData?.data || [])
  const [pageIndex, setPageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = () => {
    if (!isReachingEnd && !isLoading) setPageIndex((prevPageIndex) => prevPageIndex + 1)
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const res = await getPhotoList({ pageIndex })
    const { data } = res
    if (data) {
      pageIndex === 0 ? setData(data) : setData((prevData: photoItem[]) => [...prevData, ...data])
    }
    setIsLoading(false)
  }, [pageIndex])

  useEffect(() => {
    if (pageIndex > 0) fetchData()
  }, [pageIndex, fetchData])

  const isReachingEnd = data.length >= initialData?.count

  return (
    <div>
      <PhotoProvider>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {data.map((photo, index) => (
            <PhotoView key={index} src={photo.url}>
              <PhotoCard key={index} photo={photo} />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
      {data.length > 0 ? (
        <div className="mt-8 flex min-h-16 items-center justify-center text-sm lg:mt-12">
          {!isReachingEnd ? (
            <>
              {isLoading ? (
                <div
                  className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">加载中...</span>
                </div>
              ) : (
                <Button variant="link" onClick={loadMore} disabled={isLoading} className="hover:no-underline">
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
          {isLoading && <LoadingSpinner />}
        </div>
      )}
    </div>
  )
}
