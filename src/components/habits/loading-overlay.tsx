'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
}

export function LoadingOverlay({ isLoading, children, className }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>

  return (
    <div className={cn('relative', className)}>
      {children}
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <span>处理中...</span>
        </div>
      </div>
    </div>
  )
}
