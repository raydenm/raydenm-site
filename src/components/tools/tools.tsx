import { draftMode } from 'next/headers'

import { DraftMode } from '@/components/tools/draft-mode'
import { preloadGetAllPosts } from '@/services/contentful'

// import { SettingButton } from './setting-button'
import { ColorCanvas } from './color-canvas'
// import { FondoAnimado } from './fondo-animado'
import { LineCanvas } from './line-canvas'
import { PwaDownload } from './pwa-download'
import { ThemeButton } from './theme-button'

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
      <LineCanvas />
    </div>
  )
}
