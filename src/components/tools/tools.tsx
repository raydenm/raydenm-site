import { ThemeButton } from './theme-button'
import { PwaDownload } from './pwa-download'
import { draftMode } from 'next/headers'
import { DraftMode } from '@/components/tools/draft-mode'
import { preloadGetAllPosts } from '@/services/contentful'
// import { SettingButton } from './setting-button'
import { ColorCanvas } from './color-canvas'
// import { FondoAnimado } from './fondo-animado'
import { TheCanvas } from './the-canvas'

export const Tools = () => {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)

  return (
    <div className="hidden md:block">
      <div className="fixed bottom-3 left-3 z-50 flex gap-1">
        <ThemeButton />
        <PwaDownload />
        {/* <SettingButton /> */}
        <DraftMode isEnabled={isEnabled} />
      </div>
      <ColorCanvas />
      {/* <FondoAnimado /> */}
      <TheCanvas />
    </div>
  )
}
