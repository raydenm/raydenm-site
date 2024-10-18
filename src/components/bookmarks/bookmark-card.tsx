// import dynamic from 'next/dynamic'
import { Link2Icon } from 'lucide-react'

type BookmarkCardProps = {
  bookmark: {
    _id: number
    link: string
    title: string
    cover: string
    domain: string
    excerpt: string
    note: string
  }
  order: number
}

export const BookmarkCard = ({ bookmark, order }: BookmarkCardProps) => {
  return (
    <a
      key={bookmark._id}
      className="flex min-h-[105px] cursor-pointer flex-row gap-3 overflow-hidden rounded-xl bg-muted p-3 transition-all hover:bg-cardactive xl:min-h-[118px]"
      href={`${bookmark.link}?ref=${process.env.NEXT_PUBLIC_WEBSITE_URL}`}
      target="_blank"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <div className="w-[30%]">
        <img
          src={bookmark.cover || '/assets/fallback.avif'}
          alt={bookmark.title}
          loading={order < 2 ? 'eager' : 'lazy'}
          className="aspect-square animate-reveal rounded-lg bg-cover bg-center bg-no-repeat object-cover"
          onError={(e) => {
            // @ts-ignore
            e.target.onerror = null
            // @ts-ignore
            e.target.src = '/assets/fallback.avif'
          }}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="line-clamp-4 break-all text-lg leading-snug">{bookmark.title}</div>
        <span className="line-clamp-4 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-sm">{bookmark.excerpt || bookmark.note}</span>
      </div>
    </a>
  )
}
