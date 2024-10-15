import million from 'million/compiler'
import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development'
    }
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'info']
  //   }
  // },
  trailingSlash: false,
  images: {
    deviceSizes: [390, 435, 768, 1024, 1280],
    formats: ['image/avif'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', '@supabase/supabase-js', 'react-tweet'],
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP']
  }
}

const millionConfig = {
  auto: {
    rsc: true
  },
  server: true,
  rsc: true
}

export default withPWA(million.next(nextConfig, millionConfig))
