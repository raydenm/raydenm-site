/* eslint-disable no-unused-vars */
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  url: z.string().url({
    message: '请输入正确的网站地址！'
  }),
  email: z.string().email({
    message: '请输入正确的邮箱！'
  }),
  type: z.string().optional()
})

type SubmitBookmarkFormProps = {
  bookmarks: any[]
  currentBookmark: any
  setFormOpen: (open: boolean) => void
  className?: string
}

export function SubmitBookmarkForm({ className, setFormOpen, bookmarks, currentBookmark }: SubmitBookmarkFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      email: '',
      type: currentBookmark?.title ?? ''
    }
  })
  const { reset } = form

  async function onSubmit(values: any) {
    setIsSubmitting(true)
    fetch('/api/submit-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(() => {
        toast.success('网站提交成功!')
        reset()
      })
      .catch(() => toast.error('提交失败, 请稍后再试'))
      .finally(() => {
        setIsSubmitting(false)
        setFormOpen(false)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站地址</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="send@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择一个网站类型" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bookmarks.map((bookmark) => (
                    <SelectItem key={bookmark.slug} value={bookmark.title}>
                      {bookmark.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isSubmitting ? 'summitting' : 'submit'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {isSubmitting ? '提交中...' : '提交'}
            </motion.span>
          </AnimatePresence>
        </Button>
      </form>
    </Form>
  )
}
