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
      className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300 hover:bg-gray-100"
      href={`${bookmark.link}?ref=${process.env.WEBSITE_URL}`}
      target="_blank"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <img
          src={bookmark.cover || '/assets/fallback.avif'}
          alt={bookmark.title}
          width={1200}
          height={630}
          loading={order < 2 ? 'eager' : 'lazy'}
          className="aspect-[1200/630] animate-reveal rounded-lg border bg-cover bg-center bg-no-repeat object-cover"
          onError={(e) => {
            // @ts-ignore
            e.target.onerror = null
            // @ts-ignore
            e.target.src = '/assets/fallback.avif'
          }}
        />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-4 text-lg leading-snug">{bookmark.title}</h2>
        <span className="line-clamp-4 inline-flex items-center gap-1 text-sm text-gray-500">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-sm">{bookmark.excerpt || bookmark.note}</span>
      </div>
    </a>
  )
}
