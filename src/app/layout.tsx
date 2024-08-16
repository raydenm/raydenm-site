import '@/style/globals.css'
import '@/style/theme-transition.css'

import React from 'react'

import { draftMode } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { EyeIcon } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/layout/tailwind-indicator'
import { SideMenu } from '@/components/layout/side-menu'
import { MenuContent } from '@/components/layout/menu-content'
import { preloadGetAllPosts } from '@/lib/contentful'
import { sharedMetadata } from '@/app/shared-metadata'
import { ThemeProvider } from '@/app/theme-provider'
import { ThemeButton } from '@/components/layout/theme-button'
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">
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
          <ThemeButton />
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
