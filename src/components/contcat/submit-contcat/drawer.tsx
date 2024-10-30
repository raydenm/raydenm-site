'use client'

import { useState } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

import { SubmitContcatForm } from '@/components/contcat/submit-contcat/form'
import { SUBMIT_CONTCAT_FORM_TITLE, SUBMIT_CONTCAT_FORM_DESCRIPTION } from '@/config'

export const SubmitContcatDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <span className="mx-1 text-blue-600 hover:underline hover:decoration-1">与我联系</span>
      </DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>{SUBMIT_CONTCAT_FORM_TITLE}</DrawerTitle>
          <DrawerDescription className="m-0">{SUBMIT_CONTCAT_FORM_DESCRIPTION}</DrawerDescription>
        </DrawerHeader>
        <SubmitContcatForm setFormOpen={setOpen} className="py-8" />
      </DrawerContent>
    </Drawer>
  )
}
