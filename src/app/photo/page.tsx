import { Suspense } from 'react'

import { FloatingHeader } from '@/components/common/floating-header'
import { GradientBg } from '@/components/common/gradient-bg'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { ScrollArea } from '@/components/common/scroll-area'
import { PageTitle } from '@/components/layout/page-title'
import { PhotoList } from '@/components/photo/photo-list'
import { getPhotoList } from '@/services/supabase/photo'
// import { Link } from '@/components/common/link'
// import { umami } from '@/lib/analytics'
async function fetchData() {
  const photoData = await getPhotoList({})
  return photoData
}

export default async function Photo() {
  const photoData = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="图库" />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex items-center justify-between">
            <PageTitle title="图库" />
            {/* <Link data-umami-event={umami.imgstorageTrack.name} href="https://img-storage.pages.dev">
              图床
            </Link> */}
          </div>

          <Suspense fallback={<ScreenLoadingSpinner />}>
            <PhotoList initialData={photoData} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const title = `${process.env.NEXT_PUBLIC_WEBSITE_USERNAME}-图库`
  const description = '图库'
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
