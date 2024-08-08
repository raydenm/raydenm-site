// src/middleware.ts

import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const { pathname } = new URL(request.url)
  const writingSlug = pathname.match(/\/writing\/(.*)/)?.[1]

  if (writingSlug) {
    const URL =
      process.env.NODE_ENV === 'production'
        ? process.env.WEBSITE_URL + '/api/increment-views'
        : 'http://localhost:3000/api/increment-views'
    // Perform your analytics or logging here
    fetch(`${URL}?slug=${writingSlug}`, {
      method: 'GET'
    })
  }

  return NextResponse.next()
}

// import { NextResponse } from 'next/server'

// export function middleware(
//   request: { nextUrl: { pathname: any } },
//   event: { waitUntil: (arg0: Promise<void>) => void }
// ) {
//   const { pathname } = request.nextUrl
//   const writingSlug = pathname.match(/\/writing\/(.*)/)?.[1]

//   async function sendAnalytics() {
//     const URL =
//       process.env.NODE_ENV === 'production'
//         ? process.env.WEBSITE_URL + '/api/increment-views'
//         : 'http://localhost:3000/api/increment-views'
//     try {
//       const res = await fetch(`${URL}?slug=${writingSlug}&timestamp=${Date.now()}`, {
//         method: 'GET',
//       })
//       console.log('Analytics sent', res)
//       if (res.status !== 200) console.error('Failed to send analytics', res)
//     } catch (error) {
//       console.error('Error sending analytics', error)
//     }
//   }

//   /**
//    * The `event.waitUntil` function is the real magic here.
//    * It enables the response to proceed without waiting for the completion of `sendAnalytics()`.
//    * This ensures that the user experience remains uninterrupted and free from unnecessary delays.
//    */
//   if (writingSlug) event.waitUntil(sendAnalytics())
//   return NextResponse.next()
// }

// export const config = {
//   // matcher: '/writing/:path/'
//   // The below solution also filters out the user navigations which is not desired:
//   // See: https://github.com/vercel/next.js/discussions/37736#discussioncomment-7886601
//   matcher: [
//     {
//       source: '/writing/:path/',
//       missing: [
//         { type: 'header', key: 'next-router-prefetch' },
//         { type: 'header', key: 'purpose', value: 'prefetch' }
//       ]
//     }
//   ]
// }
