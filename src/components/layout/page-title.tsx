import React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

type PageTitleProps = {
  title: string
  subtitle?: React.ReactNode
  className?: string
  [key: string]: any
}

export const PageTitle = ({ title, subtitle, className, ...rest }: PageTitleProps) => {
  return (
    <div className={cn('mb-6', className)}>
      <Balancer className="!text-pretty text-3xl font-semibold" as="div" {...rest}>
        {title}
      </Balancer>
      {subtitle}
    </div>
  )
}
