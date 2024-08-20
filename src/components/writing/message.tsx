'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import useSystemTheme from '@/hooks/useSystemTheme'
export function Message({ slug }: { slug: string }) {
  const repo = process.env.NEXT_PUBLIC_REPO || ''
  const repoId = process.env.NEXT_PUBLIC_REPO_ID || ''
  const category = process.env.NEXT_PUBLIC_CATEGORY || ''
  const categoryId = process.env.NEXT_PUBLIC_CATEGORY_ID || ''
  const { theme } = useTheme()
  const [giscusTheme, setGiscusTheme] = useState('light')

  // 记录访问量
  useEffect(() => {
    fetch(`/api/increment-views?slug=${slug}`)
  }, [slug])

  const systemTheme = useSystemTheme()

  useEffect(() => {
    if (theme === 'system') {
      setGiscusTheme(systemTheme)
    } else {
      theme && setGiscusTheme(theme)
    }
  }, [systemTheme, theme])

  return (
    <div className="mb-2 mt-16">
      <Giscus
        id="comments"
        // @ts-ignore
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="zh-CN"
      />
    </div>
  )
}
