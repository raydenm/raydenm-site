'use client'

import Giscus from '@giscus/react'
import { useEffect } from 'react'

import useRealTheme from '@/hooks/useRealTheme'
import supabase from '@/services/supabase/public'

const updateViewCount = async (slug: string) => {
  if (!slug) return
  const { data: record } = await supabase.from('view_data').select('slug, view_count').eq('slug', slug).single()

  if (!record) {
    await supabase.from('view_data').insert({ slug, view_count: 1 }).select().single()
  } else {
    const newViewCount = (record?.view_count || 0) + 1
    await supabase.from('view_data').update({ view_count: newViewCount }).eq('slug', slug).select().single()
  }
}

export function Message({ slug }: { slug: string }) {
  const repo = process.env.NEXT_PUBLIC_REPO || ''
  const repoId = process.env.NEXT_PUBLIC_REPO_ID || ''
  const category = process.env.NEXT_PUBLIC_CATEGORY || ''
  const categoryId = process.env.NEXT_PUBLIC_CATEGORY_ID || ''

  // 记录访问量
  useEffect(() => {
    updateViewCount(slug)
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
