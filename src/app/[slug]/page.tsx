import { Suspense } from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { ScrollArea } from '@/components/common/scroll-area'
import { PageTitle } from '@/components/layout/page-title'
import { FloatingHeader } from '@/components/common/floating-header'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { GradientBg } from '@/components/common/gradient-bg'
import { RichText } from '@/components/contentful/rich-text'
import { getPage, getAllPageSlugs } from '@/lib/contentful'
import { isDevelopment } from '@/lib/utils'

export async function generateStaticParams() {
  const allPages: { slug: string; hasCustomPage: string }[] = await getAllPageSlugs()

  return allPages
    .filter((page) => !page.hasCustomPage)
    .map((page) => ({
      slug: page.slug
    }))
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode()
  const page = await getPage(slug, isDevelopment || isEnabled)
  if (!page) notFound()
  return { page }
}

export default async function PageSlug({ params }: { params: { slug: string } }) {
  const { slug } = params
  const {
    page: { title, content }
  } = await fetchData(slug)

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <RichText content={content} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export const runtime = 'edge'
