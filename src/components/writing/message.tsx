'use client'

import { useEffect } from 'react'
// import Giscus from '@giscus/react'
export function Message({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/increment-views?slug=${slug}`)
  }, [slug])

  return (
    <div className="mb-2 mt-16">
      {/* <Giscus
        id="comments"
        repo="raydenm/raydenm-site"
        repoId="R_kgDOMguWIg"
        category="Announcements"
        categoryId="DIC_kwDOMguWIs4ChnLC"
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="zh-CN"
        loading='lazy'
      /> */}
    </div>
  )
}
