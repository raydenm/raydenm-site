'use client'

import { useEffect, useState } from 'react'
import { User } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SubmitContcatForm } from '@/components/submit-contcat/form'
import useStore from '@/store/index'
import { SUBMIT_CONTCAT_FORM_TITLE, SUBMIT_CONTCAT_FORM_DESCRIPTION } from '@/lib/constants'

export const SubmitContcatDialog = () => {
  const [open, setOpen] = useState(false)
  const setEditing = useStore((state) => state.setEditing)

  useEffect(() => {
    setEditing(open)
  }, [open, setEditing])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="relative">
          <User size={16} className="mr-2" />
          联系我
        </Button>
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
