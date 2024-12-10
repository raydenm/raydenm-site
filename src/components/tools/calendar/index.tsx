'use client'

import { CalendarDays } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { CustomCalendar } from './custom-calendar'

export const CalendarDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer rounded-full p-2 text-[#6B7785] transition-all hover:bg-muted/50">
          <CalendarDays className="size-5" />
        </div>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>日历</DialogTitle>
        </DialogHeader>
        <CustomCalendar />
      </DialogContent>
    </Dialog>
  )
}
