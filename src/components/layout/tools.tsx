import { ThemeButton } from './theme-button'
import { PwaDownload } from './pwa-download'
import { draftMode } from 'next/headers'
import { DraftMode } from '@/components/layout/draft-mode'
import { preloadGetAllPosts } from '@/services/contentful'

export const Tools = () => {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)

  return (
    <div className="hidden md:block">
      <div className="fixed bottom-3 left-3 z-50 flex gap-1">
        <ThemeButton />
        <PwaDownload />
        <DraftMode isEnabled={isEnabled} />
      </div>
    </div>
  )
}
