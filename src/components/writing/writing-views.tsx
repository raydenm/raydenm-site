'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'

import { useViewData } from '@/hooks/useViewData'
import { viewCountFormatter } from '@/lib/utils'
import { Eye } from 'lucide-react'

export const WritingViews = ({ slug }: { slug: string }) => {
  const viewData: { slug: string; view_count: number }[] = useViewData(slug)
  const { view_count } = viewData?.[0] ?? {}
  if (!view_count) return <m.span key={`${slug}-views-loading`} />
  const formattedViewCount = viewCountFormatter.format(view_count)

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        key={`${slug}-views-loaded`}
        className="flex items-center text-sm"
        title={`${formattedViewCount} ${formattedViewCount === '1' ? 'view' : 'views'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Eye size={20} className="mr-1" />
        <span className="tabular-nums">{formattedViewCount}</span>
      </m.div>
    </LazyMotion>
  )
}
