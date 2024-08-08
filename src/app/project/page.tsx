import { Suspense } from 'react'
import { ScrollArea } from '@/components/common/scroll-area'
import { GradientBg } from '@/components/common/gradient-bg'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/common/page-title'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { ProjectList } from '@/components/project/project-list'
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
