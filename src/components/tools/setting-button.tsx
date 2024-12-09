'use client'

import { Settings } from 'lucide-react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export const SettingButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-full p-2 text-[#6B7785] transition-all hover:bg-muted/50">
          <Settings size={20} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>设置</DialogTitle>
          <DialogDescription>设置属于你的风格</DialogDescription>
        </DialogHeader>
        {/* <SubmitContcatForm setFormOpen={setOpen} /> */}
      </DialogContent>
    </Dialog>
  )
}
