import { Suspense } from 'react'
import { ScrollArea } from '@/components/common/scroll-area'
import { GradientBg } from '@/components/common/gradient-bg'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/layout/page-title'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { PhotoList } from '@/components/photo/photo-list'
import { getPhotoList } from '@/lib/photo'

async function fetchData() {
  const res = await getPhotoList({})
  const { data, count } = res || { data: [], count: 0 }
  return {
    photoList: data,
    count
  }
}

export default async function Photo() {
  const { photoList, count } = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="相册" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="相册" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <PhotoList initData={{ photoList, count }} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
