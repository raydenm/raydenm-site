import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/common/scroll-area'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { WritingList } from '@/components/writing/writing-list'
import { FloatingHeader } from '@/components/common/floating-header'
import { PageTitle } from '@/components/common/page-title'
import { Button } from '@/components/ui/button'
import { getAllPosts } from '@/lib/contentful'
import { getSortedPosts, getItemsByYear } from '@/lib/utils'
// import { ContcatContent } from '@/components/contcat-content'

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
      <FloatingHeader scrollTitle="主页" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="主页" className="lg:hidden" />
          <p>我是一名软件开发工程师，对设计和开发富有创造力和用户友好的应用充满热情。</p>
          <p>
            拥有7年的开发经验，精通JavaScript，并擅长使用现代框架如React、Vue.js等
            <a className="text-[#3b82f6] hover:underline hover:decoration-1" href="/stack">
              技术栈
            </a>
            。
            我喜欢挑战自我，时刻关注前沿技术和设计趋势，不断提升自己的技能。我曾与多个跨职能团队合作，从需求分析到最终部署，参与项目的各个阶段，成功交付了多项项目。
          </p>
          <div className="mb-6">
            在我的个人时间，我喜欢研究新的技术和工具，探索设计领域的创新，并撰写博客分享我的学习和心得。如果你有任何问题或者想要交流，请随时与我联系！
            {/* <ContcatContent /> */}
          </div>
          <p>欢迎来到我的个人主页，希望你能喜欢我的作品和分享的内容！</p>

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
