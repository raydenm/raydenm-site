'use client'

import { draft, disableDraft } from '@/app/actions'
import { Button } from '@/components/ui/button'

export const DraftMode = ({ isEnabled }: { isEnabled: boolean }) => {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-14">
      {isEnabled ? (
        <Button className="text-green-500" variant="link" size="sm" onClick={() => disableDraft()}>
          草稿模式已开启
        </Button>
      ) : (
        <Button variant="link" size="sm" onClick={() => draft()}>
          开启草稿模式
        </Button>
      )}
    </div>
  )
}
