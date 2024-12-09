import React from 'react'

import { SCROLL_AREA_ID } from '@/config'
import { cn } from '@/lib/utils'

type ScrollAreaProps = {
  useScrollAreaId?: boolean
  className?: string
  children: React.ReactNode
}

export const ScrollArea = ({ useScrollAreaId = false, className, ...rest }: ScrollAreaProps) => (
  <div
    {...(useScrollAreaId && { id: SCROLL_AREA_ID })}
    className={cn('scrollable-area relative flex w-full flex-col', className)}
    {...rest}
  />
)
