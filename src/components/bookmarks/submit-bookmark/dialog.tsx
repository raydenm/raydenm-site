'use client'

import { useEffect, useState } from 'react'
import { SendIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SubmitBookmarkForm } from '@/components/bookmarks/submit-bookmark/form'
import { SUBMIT_BOOKMARK_FORM_TITLE, SUBMIT_BOOKMARK_FORM_DESCRIPTION } from '@/config'
import useStore from '@/store/index'
import type { BookmarksType } from '@/services/raindrop'

type SubmitBookmarkDialogProps = {
  bookmarks: BookmarksType
  currentBookmark: any
}
export const SubmitBookmarkDialog = ({ bookmarks, currentBookmark }: SubmitBookmarkDialogProps) => {
  const [open, setOpen] = useState(false)
  const setEditing = useStore((state) => state.setEditing)

  useEffect(() => {
    setEditing(open)
  }, [open, setEditing])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs" className="relative">
          <SendIcon size={16} className="mr-2" />
          提交网站
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{SUBMIT_BOOKMARK_FORM_TITLE}</DialogTitle>
          <DialogDescription>{SUBMIT_BOOKMARK_FORM_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <SubmitBookmarkForm setFormOpen={setOpen} bookmarks={bookmarks} currentBookmark={currentBookmark} />
      </DialogContent>
    </Dialog>
  )
}
