import { Suspense } from 'react'
import { ScrollArea } from '@/components/common/scroll-area'
import { GradientBg } from '@/components/common/gradient-bg'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/common/page-title'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'

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
