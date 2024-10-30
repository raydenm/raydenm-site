import { Suspense } from 'react'
import { ScrollArea } from '@/components/common/scroll-area'
import { GradientBg } from '@/components/common/gradient-bg'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/layout/page-title'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { StackList } from '@/components/stack/stack-list'
import { STACK_LIST } from '@/config'
export default async function Stack() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle="技术栈" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="技术栈" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <StackList list={STACK_LIST} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const title = `${process.env.NEXT_PUBLIC_WEBSITE_USERNAME}-技术栈`
  const description = '技术栈'
  const siteUrl = '/stack'

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
