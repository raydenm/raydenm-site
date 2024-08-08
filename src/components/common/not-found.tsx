import { ScrollArea } from '@/components/common/scroll-area'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/common/page-title'

export function NotFound() {
  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="Not found" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Not found" />
          <p>This link might be broken, deleted, or moved. Nevertheless, there’s nothing to see here...</p>
        </div>
      </div>
    </ScrollArea>
  )
}
