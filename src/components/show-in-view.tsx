'use client'

import { useInView } from 'react-intersection-observer'
import React from 'react'
type ShowInViewProps = {
  children: React.ReactNode
  rootMargin?: string
  triggerOnce?: boolean
}

export const ShowInView = ({ children, rootMargin = '0px', triggerOnce = true, ...rest }: ShowInViewProps) => {
  const { ref, inView } = useInView({
    rootMargin,
    triggerOnce
  })

  return (
    <div ref={ref} data-role="intersection-observer" {...rest}>
      {inView && children}
    </div>
  )
}
