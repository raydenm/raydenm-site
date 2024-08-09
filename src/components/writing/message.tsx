'use client'

import { useEffect, useRef } from 'react'

export function Message({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const scriptAdded = useRef(false)

  useEffect(() => {
    if (!scriptAdded.current) {
      const URL =
        process.env.NODE_ENV === 'production'
          ? process.env.WEBSITE_URL + '/api/increment-views'
          : 'http://localhost:3000/api/increment-views'
      fetch(`${URL}/api/increment-views?slug=${slug}`)
      const scriptElement = document.createElement('script')
      scriptElement.async = true
      scriptElement.crossOrigin = 'anonymous'
      scriptElement.src = 'https://utteranc.es/client.js'

      scriptElement.setAttribute('issue-term', slug)
      scriptElement.setAttribute('label', 'comment')
      scriptElement.setAttribute('repo', 'raydenm/raydenm-site')
      scriptElement.setAttribute('theme', 'github-light')

      ref.current?.appendChild(scriptElement)
      scriptAdded.current = true
    }
  }, [slug])

  return <div className="mb-2 mt-10" ref={ref} />
}
