import '@/style/globals.css'
import '@/style/theme-transition.css'

import React from 'react'

import { draftMode } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/layout/tailwind-indicator'
import { SideMenu } from '@/components/layout/side-menu'
import { MenuContent } from '@/components/layout/menu-content'
import { preloadGetAllPosts } from '@/services/contentful'
import { sharedMetadata } from '@/app/shared-metadata'
import { ThemeProvider } from '@/app/theme-provider'
import { ThemeButton } from '@/components/layout/theme-button'
import { DraftMode } from '@/components/layout/draft-mode'
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3cf694bd-ddd7-4b7b-b96d-3227c54e985d"
        ></script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">
            <div className="lg:flex">
              <SideMenu>
                <MenuContent />
              </SideMenu>
              <div className="flex flex-1">{children}</div>
            </div>
          </main>
          <TailwindIndicator />
          <ThemeButton />
          <DraftMode isEnabled={isEnabled} />
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL as string),
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
