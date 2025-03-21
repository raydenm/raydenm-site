'use client'

import { SquarePen } from 'lucide-react'

import { disableDraft, draft } from '@/app/actions'

export const DraftMode = ({ isEnabled }: { isEnabled: boolean }) => {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div
      onClick={() => (isEnabled ? disableDraft() : draft())}
      className={`cursor-pointer rounded-full p-2 text-[#6B7785] transition-all hover:bg-muted/50 ${isEnabled && 'text-green-500'}`}
    >
      <SquarePen size={20} />
    </div>
  )
}
