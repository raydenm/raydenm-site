import '@/style/globals.css'
import '@/style/theme-transition.css'
import '@/style/sprites.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { sharedMetadata } from '@/app/shared-metadata'
import { ThemeProvider } from '@/app/theme-provider'
import { MenuContent } from '@/components/layout/menu-content'
import { SideMenu } from '@/components/layout/side-menu'
import { TailwindIndicator } from '@/components/tools/tailwind-indicator'
import { Tools } from '@/components/tools/tools'
import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/env'

import { WebVitals } from './web-vitals'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        ></script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* bg-background */}
          <main className="min-h-screen">
            <div className="lg:flex">
              <SideMenu>
                <MenuContent />
              </SideMenu>
              <div className="flex flex-1">{children}</div>
            </div>
          </main>
          <TailwindIndicator />
          <Tools />
          <WebVitals />
          <Toaster
            closeButton
            richColors
            toastOptions={{
              duration: 5000
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL as string),
  robots: {
    index: true,
    follow: true
  },
  title: {
    default: sharedMetadata.title
  },
  manifest: '/manifest.json',
  description: sharedMetadata.description,
  keywords: sharedMetadata.keywords,
  alternates: {
    canonical: '/'
  },
  other: {
    pinterest: 'nopin'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
}
