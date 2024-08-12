import '@/globals.css'
import { draftMode } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { EyeIcon } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'

import { TailwindIndicator } from '@/components/layout/tailwind-indicator'
import { SideMenu } from '@/components/bookmarks/side-menu'
import { MenuContent } from '@/components/layout/menu-content'
import { preloadGetAllPosts } from '@/lib/contentful'
import { sharedMetadata } from '@/app/shared-metadata'

import React from 'react'

type RootLayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main className="min-h-screen bg-white">
          {isEnabled && (
            <div className="absolute inset-x-0 bottom-0 z-50 flex h-12 w-full items-center justify-center bg-green-500 text-center text-sm font-medium text-white">
              <div className="flex items-center gap-2">
                <EyeIcon size={16} />
                <span>已启用草稿模式</span>
              </div>
            </div>
          )}
          <div className="lg:flex">
            <SideMenu>
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
        <TailwindIndicator />
        <Toaster
          closeButton
          richColors
          toastOptions={{
            duration: 5000
          }}
        />
      </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL(process.env.WEBSITE_URL as string),
  robots: {
    index: true,
    follow: true
  },
  title: {
    default: sharedMetadata.title
  },
  // description: sharedMetadata.description,
  keywords: ['raydenm'],
  alternates: {
    canonical: '/'
  },
  other: {
    pinterest: 'nopin'
  }
}

export const viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1
}
