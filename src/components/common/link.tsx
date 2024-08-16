import NextLink from 'next/link'

import { isExternalLink } from '@/lib/utils'

export const Link = ({ href = '#', ...rest }) => {
  const isExternal = isExternalLink(href)
  if (isExternal) {
    return (
      <a
        href={href + '?ref=' + process.env.NEXT_PUBLIC_WEBSITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="访问外部资源↗"
        className="link break-words after:content-['_↗']"
        {...rest}
      />
    )
  }

  return <NextLink href={href} className="link" {...rest} />
}
