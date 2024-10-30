import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/common/scroll-area'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { WritingList } from '@/components/writing/writing-list'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/layout/page-title'
import { Button } from '@/components/ui/button'
import { getAllPosts } from '@/services/contentful'
import { getSortedPosts, getItemsByYear } from '@/lib/utils'
import { ContcatContent } from '@/components/contcat/contcat-content'

async function fetchData() {
  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  const items = getItemsByYear(sortedPosts)
  return { items }
}

export default async function Home() {
  const { items } = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle={process.env.NEXT_PUBLIC_WEBSITE_USERNAME} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={process.env.NEXT_PUBLIC_WEBSITE_USERNAME as string} />
          <div>
            <div className="mb-4 leading-slacker">这是一个记录成长及归纳总结的地方。</div>
            <div className="mb-4 leading-slacker">
              喜欢研究新的技术和工具，关注前沿技术和设计趋势，这是我的
              <a className="mx-1 text-blue-600 hover:underline hover:decoration-1" href="/stack">
                技术栈
              </a>
              。如果你有任何问题或者想要交流，请随时
              <ContcatContent />！
            </div>
            <div className="mb-4 leading-slacker"></div>
          </div>
          {/* <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">技术栈</h2>
            </Link>
          </Button>
          <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">项目</h2>
            </Link>
          </Button> */}
          <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">文章</h2>
            </Link>
          </Button>
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <WritingList items={items} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_USERNAME}-主页`
  }
}
