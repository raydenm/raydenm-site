import type { photoItem } from '@/components/photo/photo-list'
import { forwardRef } from 'react'

interface PhotoCardProps {
  onClick?: () => void
  photo: photoItem
}

export const PhotoCard = forwardRef<HTMLDivElement, PhotoCardProps>(({ onClick, photo }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className="aspect-[16/9] overflow-hidden rounded-md bg-primary-foreground md:aspect-[16/9]"
  >
    <img
      src={`${photo.url}?w=220`}
      alt="/assets/fallback.avif"
      className="size-full animate-reveal cursor-pointer rounded-md border-0 object-cover transition-all duration-500 hover:scale-105"
    />
  </div>
))
