import type { phoneItem } from '@/components/photo/photo-list'
import ImageDialog from '@/components/common/image-dialog'
import { useState } from 'react'
export const PhotoCard = ({ photo }: { photo: phoneItem }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="aspect-[16/9] overflow-hidden rounded-md md:aspect-[16/9]">
      <img
        src={photo.url ? `${photo.url}?w=300` : '/assets/fallback.avif'}
        alt={photo.description}
        loading="lazy"
        className="size-full cursor-pointer rounded-md border-0 object-cover transition-all duration-500 hover:scale-105"
        onClick={() => setOpen(true)}
      />
      <ImageDialog url={photo.url} open={open} setOpen={setOpen} />
    </div>
  )
}
