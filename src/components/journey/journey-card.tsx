import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
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

export const JourneyCard = ({ title, description, image, location }: JourneyCardProps) => (
  <div className="flex flex-col break-words">
    <span className="font-semibold tracking-tight">{title}</span>
    {description && (
      <div className="mt-1 text-sm">
        <MarkdownRenderer>{description}</MarkdownRenderer>
      </div>
    )}
    {image?.url && (
      <div className="mt-2.5 ">
        <img
          src={image.url}
          alt={image.title || image.description}
          width={image.width}
          height={image.height}
          className="animate-reveal rounded-xl"
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
