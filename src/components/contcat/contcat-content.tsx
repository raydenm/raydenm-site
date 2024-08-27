'use client'

import { SubmitContcatDialog } from '@/components/contcat/submit-contcat/dialog'
import { SubmitContcatDrawer } from '@/components/contcat/submit-contcat/drawer'

export const ContcatContent = () => {
  return (
    <>
      <span className="hidden lg:inline-block">
        <SubmitContcatDialog />
      </span>
      <span className="lg:hidden">
        <SubmitContcatDrawer />
      </span>
    </>
  )
}
