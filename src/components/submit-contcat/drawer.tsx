'use client'

import { useState } from 'react'
import { SendIcon } from 'lucide-react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { SubmitContcatForm } from '@/components/submit-contcat/form'
import { SUBMIT_CONTCAT_FORM_TITLE, SUBMIT_CONTCAT_FORM_DESCRIPTION } from '@/lib/constants'

export const SubmitContcatDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="xs" className="relative">
          <SendIcon size={16} className="mr-2" />
          联系我
        </Button>
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
