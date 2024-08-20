import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
const MarkdownRenderer = dynamic(() =>
  import('@/components/journey/markdown-renderer').then((mod) => mod.MarkdownRenderer)
)

type JourneyCardProps = {
  title: string
  description?: string
  image?: {
    url: string
    title?: string
    description?: string
    width: number
    height: number
  }
  index: number
  location?: string
}

export const JourneyCard = ({ title, description, image, index, location }: JourneyCardProps) => (
  <div className="word-break-word flex flex-col">
    <span className="font-semibold tracking-tight">{title}</span>
    {description && (
      <div className="mt-1 text-sm">
        <MarkdownRenderer>{description}</MarkdownRenderer>
      </div>
    )}
    {image?.url && (
      <div className="mt-2.5 overflow-hidden rounded-xl bg-primary-foreground">
        <img
          src={image.url}
          alt={image.title || image.description}
          width={image.width}
          height={image.height}
          // loading={index < 1 ? 'eager' : 'lazy'}
          className="animate-reveal"
        />
      </div>
    )}
    {location && (
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="size-3" />
        <span>{location}</span>
      </div>
    )}
  </div>
)
