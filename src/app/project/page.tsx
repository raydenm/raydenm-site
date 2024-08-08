import { Suspense } from 'react'
import { ScrollArea } from '@/components/scroll-area'
import { GradientBg } from '@/components/gradient-bg'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { ProjectList } from '@/components/project-list'
export default async function Project() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="项目集" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="项目集" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <ProjectList />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
