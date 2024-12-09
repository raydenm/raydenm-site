/* eslint-disable no-unused-vars */
'use client'

import { useReportWebVitals } from 'next/web-vitals'

import { umami } from '@/lib/analytics'

declare global {
  interface Window {
    umami: any
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (!window || !window.umami) {
      return null
    }
    switch (metric.name) {
      case 'FCP': {
        window.umami.track(umami.webVitals.fcp.name, { data: metric.value })
        break
      }
      case 'LCP': {
        window.umami.track(umami.webVitals.lcp.name, { data: metric.value })
        break
      }
      case 'CLS': {
        window.umami.track(umami.webVitals.cls.name, { data: metric.value })
        break
      }
      case 'FID': {
        window.umami.track(umami.webVitals.fid.name, { data: metric.value })
        break
      }
      case 'INP': {
        window.umami.track(umami.webVitals.inp.name, { data: metric.value })
      }
    }
  })

  return null
}
