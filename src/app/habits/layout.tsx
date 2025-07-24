import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '习惯养成 - RaydenM',
  description: '培养好习惯，成就更好的自己。制定每日计划，跟踪完成情况，养成健康的生活方式。'
}

export default function HabitsLayout({ children }: { children: React.ReactNode }) {
  return children
}
