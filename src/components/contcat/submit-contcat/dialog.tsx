'use client'

import { useEffect, useState } from 'react'

import { SubmitContcatForm } from '@/components/contcat/submit-contcat/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SUBMIT_CONTCAT_FORM_DESCRIPTION, SUBMIT_CONTCAT_FORM_TITLE } from '@/config'
import useStore from '@/store/index'

export const SubmitContcatDialog = () => {
  const [open, setOpen] = useState(false)
  const setEditing = useStore((state) => state.setEditing)

  useEffect(() => {
    setEditing(open)
  }, [open, setEditing])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="mx-1 text-blue-600 hover:underline hover:decoration-1">与我联系</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{SUBMIT_CONTCAT_FORM_TITLE}</DialogTitle>
          <DialogDescription>{SUBMIT_CONTCAT_FORM_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <SubmitContcatForm setFormOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
