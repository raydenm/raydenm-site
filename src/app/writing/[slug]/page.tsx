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
import { GetServerSideProps } from 'next'
import 'highlight.js/styles/github-dark.css'
export async function generateStaticParams() {
  const allPosts: { slug: string }[] = await getAllPostSlugs()
  return allPosts.map((post) => ({ slug: post.slug }))
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  try {
    const URL =
      process.env.NODE_ENV === 'production'
        ? process.env.WEBSITE_URL + '/api/increment-views'
        : 'http://localhost:3000/api/increment-views'

    const res = await fetch(`${URL}?slug=${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.status !== 200) console.error('Failed to send analytics', res)
  } catch (error) {
    console.error('Error sending analytics', error)
  }

  return { props: {} } // Return props or empty object if no props needed
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode()
  const data = await getPost(slug, isDevelopment ? true : isEnabled)
  if (!data) notFound()

  return {
    data
  }
}

export default async function WritingSlug({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data } = await fetchData(slug)
  // sendAnalytics(slug)

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
