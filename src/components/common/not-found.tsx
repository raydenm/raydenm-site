import { FloatingHeader } from '@/components/common/floating-header'
import { ScrollArea } from '@/components/common/scroll-area'
import { PageTitle } from '@/components/layout/page-title'

export function NotFound() {
  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="未找到" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="未找到" />
          <p>此链接可能已损坏、删除或移动。不过，这里没什么可看的...</p>
        </div>
      </div>
    </ScrollArea>
  )
}
