import type { phoneItem } from '@/components/photo/photo-list'
export const PhotoCard = ({ photo }: { photo: phoneItem }) => {
  return (
    <div className="overflow-hidden rounded-2xl">
      <img
        src={photo.url || '/assets/fallback.avif'}
        alt={photo.description}
        loading="lazy"
        className="size-auto cursor-pointer object-cover transition-all hover:scale-105"
      />
    </div>
  )
}
