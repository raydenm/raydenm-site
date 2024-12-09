'use client'

import Giscus from '@giscus/react'
import { useEffect } from 'react'

import useRealTheme from '@/hooks/useRealTheme'
export function Message({ slug }: { slug: string }) {
  const repo = process.env.NEXT_PUBLIC_REPO || ''
  const repoId = process.env.NEXT_PUBLIC_REPO_ID || ''
  const category = process.env.NEXT_PUBLIC_CATEGORY || ''
  const categoryId = process.env.NEXT_PUBLIC_CATEGORY_ID || ''

  // 记录访问量
  useEffect(() => {
    fetch(`/api/increment-views?slug=${slug}`)
  }, [slug])

  const realTheme = useRealTheme()

  return (
    <div className="mb-2 mt-16">
      <Giscus
        id="comments"
        key={realTheme}
        // @ts-ignore
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme={realTheme}
        lang="zh-CN"
      />
    </div>
  )
}
