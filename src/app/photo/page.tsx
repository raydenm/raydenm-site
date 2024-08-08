import { Suspense } from 'react'
import { ScrollArea } from '@/components/scroll-area'
import { GradientBg } from '@/components/gradient-bg'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'

export default async function Photo() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="相册" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="相册" />
          <Suspense fallback={<ScreenLoadingSpinner />}></Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
