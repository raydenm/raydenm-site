import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const writingSlug = pathname.match(/\/writing\/(.*)/)?.[1]

  async function sendAnalytics() {
    try {
      const res = await fetch(`https://raydenm.zeabur.app/api/increment-views?slug=${writingSlug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      })
      if (res.status !== 200) console.error('Failed to send analytics', res)
    } catch (error) {
      console.error('Error sending analytics', error)
    }
  }

  /**
   * The `event.waitUntil` function is the real magic here.
   * It enables the response to proceed without waiting for the completion of `sendAnalytics()`.
   * This ensures that the user experience remains uninterrupted and free from unnecessary delays.
   */
  if (writingSlug) event.waitUntil(sendAnalytics())
  return NextResponse.next()
}

export const config = {
  matcher: '/writing/:path*'
  // The below solution also filters out the user navigations which is not desired:
  // See: https://github.com/vercel/next.js/discussions/37736#discussioncomment-7886601
  // matcher: [
  //   {
  //     source: '/writing/:path/',
  //     missing: [
  //       { type: 'header', key: 'next-router-prefetch' },
  //       { type: 'header', key: 'purpose', value: 'prefetch' }
  //     ]
  //   }
  // ]
}
