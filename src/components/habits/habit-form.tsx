/* eslint-disable no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Habit, HabitCategory } from '@/services/supabase/habits'

const habitSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(200, '标题不能超过200字符'),
  description: z.string().optional(),
  category_id: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
  target_count: z.number().min(1, '目标次数至少为1').max(100, '目标次数不能超过100'),
  reminder_time: z.string().optional()
})

type HabitFormData = z.infer<typeof habitSchema>

interface HabitFormProps {
  habit?: Habit
  categories: HabitCategory[]
  onSubmit: (data: HabitFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function HabitForm({ habit, categories, onSubmit, onCancel, isLoading = false }: HabitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      title: habit?.title || '',
      description: habit?.description || '',
      category_id: habit?.category_id || '',
      frequency: habit?.frequency || 'daily',
      target_count: habit?.target_count || 1,
      reminder_time: habit?.reminder_time || ''
    }
  })

  const frequency = watch('frequency')

  const handleFormSubmit = async (data: HabitFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="title" className="text-sm sm:text-base">
          习惯标题 *
        </Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="例如：每天阅读30分钟"
          className={cn('text-sm sm:text-base', errors.title ? 'border-red-500' : '')}
        />
        {errors.title && <p className="text-xs text-red-500 sm:text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="description" className="text-sm sm:text-base">
          描述
        </Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="可选：添加一些描述来帮助你记住这个习惯"
          rows={2}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="category" className="text-sm sm:text-base">
            分类
          </Label>
          <Select value={watch('category_id')} onValueChange={(value) => setValue('category_id', value)}>
            <SelectTrigger className="text-sm sm:text-base">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full sm:size-3" style={{ backgroundColor: category.color }} />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="frequency" className="text-sm sm:text-base">
            频率
          </Label>
          <Select value={frequency} onValueChange={(value) => setValue('frequency', value as any)}>
            <SelectTrigger className="text-sm sm:text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">每日</SelectItem>
              <SelectItem value="weekly">每周</SelectItem>
              <SelectItem value="monthly">每月</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="target_count" className="text-sm sm:text-base">
            目标次数
          </Label>
          <Input
            id="target_count"
            type="number"
            min="1"
            max="100"
            {...register('target_count', { valueAsNumber: true })}
            className={cn('text-sm sm:text-base', errors.target_count ? 'border-red-500' : '')}
          />
          {errors.target_count && <p className="text-xs text-red-500 sm:text-sm">{errors.target_count.message}</p>}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="reminder_time" className="text-sm sm:text-base">
            提醒时间
          </Label>
          <Input id="reminder_time" type="time" {...register('reminder_time')} className="text-sm sm:text-base" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 sm:gap-3 sm:pt-4">
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting || isLoading}>
          取消
        </Button>
        <Button type="submit" size="sm" disabled={isSubmitting || isLoading}>
          {isSubmitting ? '保存中...' : habit ? '更新习惯' : '创建习惯'}
        </Button>
      </div>
    </form>
  )
}
