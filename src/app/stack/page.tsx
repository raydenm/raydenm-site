import { Suspense } from 'react'
import { ScrollArea } from '@/components/scroll-area'
import { GradientBg } from '@/components/gradient-bg'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { StackList } from '@/components/stack-list'
export default async function Stack() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="技术找" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="技术找" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <StackList />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
