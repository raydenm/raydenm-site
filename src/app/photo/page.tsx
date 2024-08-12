import { Suspense } from 'react'
import { ScrollArea } from '@/components/common/scroll-area'
import { GradientBg } from '@/components/common/gradient-bg'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/layout/page-title'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { PhotoList } from '@/components/photo/photo-list'
import supabase from '@/lib/supabase/public'

type phoneItem = {
  url: string
  id: string
  created_at: Date
  description: string
}
async function fetchData() {
  const { data, count } = await supabase.from('image_list').select('*', { count: 'exact' }).range(0, 29)
  return {
    data: data || [],
    count: count || 0
  }
}

export default async function Photo() {
  const { data, count }: { data: phoneItem[]; count: number } = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="相册" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="相册" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <PhotoList initData={{ data, count }} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
