import { Suspense } from 'react'
import { ScrollArea } from '@/components/common/scroll-area'
import { GradientBg } from '@/components/common/gradient-bg'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/layout/page-title'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { PhotoList } from '@/components/photo/photo-list'

export default async function Photo() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="相册" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="相册" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <PhotoList />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const title = '相册'
  const description = '相册'
  const siteUrl = '/photo'

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
