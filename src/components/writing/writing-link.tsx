import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { cn, getDateTimeFormat, viewCountFormatter } from '@/lib/utils'

type WritingLinkProps = {
  post: {
    title: string
    slug: string
    date: string
    sys: {
      firstPublishedAt: string
    }
  }
  viewCount: number
  isMobile: boolean
  isActive: boolean
}

export const WritingLink = ({ post, viewCount, isMobile, isActive }: WritingLinkProps) => {
  const date = post.date || post.sys.firstPublishedAt
  const formattedDate = getDateTimeFormat(date)
  const formattedViewCount = viewCount ? viewCountFormatter.format(viewCount) : null

  return (
    <LazyMotion features={domAnimation}>
      <Link
        key={post.slug}
        href={`/writing/${post.slug}`}
        className={cn(
          'flex flex-col gap-1',
          !isMobile && isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
          isMobile ? 'border-b border-muted px-4 py-3 text-sm' : 'rounded-lg p-2'
        )}
      >
        <span className="font-medium">{post.title}</span>
        <span className="text-muted-foreground">
          <time dateTime={date}>{formattedDate}</time>{' '}
          <span>
            {formattedViewCount ? (
              <m.span
                key={`${post.slug}-views-loaded`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="tabular-nums"
              >
                ，{formattedViewCount} 阅读
              </m.span>
            ) : (
              <m.span key={`${post.slug}-views-loading`} />
            )}
          </span>
        </span>
      </Link>
    </LazyMotion>
  )
}
