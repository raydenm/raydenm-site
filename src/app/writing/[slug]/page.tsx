import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Message } from '@/components/writing/message'
import { ScrollArea } from '@/components/common/scroll-area'
import { PageTitle } from '@/components/common/page-title'
import { FloatingHeader } from '@/components/common/floating-header'
import { WritingViews } from '@/components/writing/writing-views'
import { getPost, getAllPostSlugs } from '@/lib/contentful'
import { getDateTimeFormat, isDevelopment } from '@/lib/utils'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { Link } from '@/components/common/link'
import { sendAnalytics } from '@/lib/supabase'

import 'highlight.js/styles/github-dark.css'
export async function generateStaticParams() {
  const allPosts: { slug: string }[] = await getAllPostSlugs()
  return allPosts.map((post) => ({ slug: post.slug }))
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode()
  sendAnalytics(slug)
  const data = await getPost(slug, isDevelopment ? true : isEnabled)
  if (!data) notFound()

  return {
    data
  }
}

export default async function WritingSlug({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data } = await fetchData(slug)

  const {
    title,
    date,
    markdown,
    sys: { firstPublishedAt }
  } = data

  const postDate = date || firstPublishedAt
  const dateString = getDateTimeFormat(postDate)

  return (
    <>
      <ScrollArea className="bg-white" useScrollAreaId>
        <FloatingHeader scrollTitle={title} goBackLink="/writing">
          <WritingViews slug={slug} />
        </FloatingHeader>
        <div className="content-wrapper @container/writing">
          <article className="content">
            <PageTitle
              title={title}
              subtitle={
                <time dateTime={postDate} className="text-gray-400">
                  {dateString}
                </time>
              }
              className="mb-6 flex flex-col gap-3"
            />
            {markdown && (
              <Markdown
                components={{
                  a: ({ className, ...rest }) => <Link {...rest} />
                }}
                rehypePlugins={[rehypeHighlight]}
              >
                {markdown}
              </Markdown>
            )}
          </article>
          <Message slug={slug} />
        </div>
      </ScrollArea>
    </>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params

  const siteUrl = `/writing/${slug}`

  return {
    openGraph: {
      type: 'article',
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
