/* eslint-disable no-unused-vars */
'use client'

import { Calendar, CalendarDays, CheckCircle, Circle, Clock, MoreVertical, Target } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Habit, HabitCompletion } from '@/services/supabase/habits'

interface HabitCardProps {
  habit: Habit
  completion?: HabitCompletion
  onToggleCompletion: (habitId: string) => void
  onEdit: (habit: Habit) => void
  onDelete: (habitId: string) => void
  onToggleActive: (habitId: string) => void
  isLoading?: boolean
  isDeleting?: boolean
  isTogglingActive?: boolean
}

export function HabitCard({
  habit,
  completion,
  onToggleCompletion,
  onEdit,
  onDelete,
  onToggleActive,
  isLoading = false,
  isDeleting = false,
  isTogglingActive = false
}: HabitCardProps) {
  const handleToggleCompletion = async () => {
    await onToggleCompletion(habit.id)
  }

  const isCompleted = !!completion

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        isCompleted && 'border-green-200 bg-green-50',
        !habit.is_active && 'opacity-60',
        'p-0'
      )}
    >
      <CardHeader className="px-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <div
              className="size-2.5 rounded-full sm:size-3"
              style={{ backgroundColor: habit.category?.color || '#6B7280' }}
            />
            <div className="line-clamp-1 text-base font-medium sm:text-lg">{habit.title}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="size-7 p-0 sm:size-8">
                <MoreVertical className="size-3 sm:size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(habit)}>编辑</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleActive(habit.id)}>
                {habit.is_active ? '停用' : '启用'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(habit.id)} className="text-red-600">
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {habit.description && <p className="line-clamp-2 text-xs text-gray-600 sm:text-sm">{habit.description}</p>}

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:gap-4">
          <div className="flex items-center gap-1">
            <Target className="size-2.5 sm:size-3" />
            <span className="hidden sm:inline">目标: {habit.target_count}次</span>
            <span className="sm:hidden">{habit.target_count}次</span>
          </div>
          <div className="flex items-center gap-1">
            {habit.frequency === 'daily' ? (
              <CalendarDays className="size-2.5 sm:size-3" />
            ) : habit.frequency === 'weekly' ? (
              <Calendar className="size-2.5 sm:size-3" />
            ) : (
              <Clock className="size-2.5 sm:size-3" />
            )}
            <span className="hidden sm:inline">
              {habit.frequency === 'daily' ? '每日' : habit.frequency === 'weekly' ? '每周' : '每月'}
            </span>
            <span className="sm:hidden">
              {habit.frequency === 'daily' ? '日' : habit.frequency === 'weekly' ? '周' : '月'}
            </span>
          </div>
          {habit.category && (
            <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
              {habit.category.name}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleCompletion}
            disabled={isLoading || isDeleting || isTogglingActive || !habit.is_active}
            className={cn(
              'flex items-center gap-1.5 sm:gap-2',
              isCompleted && 'text-green-600 hover:text-green-700',
              'px-2'
            )}
          >
            {isLoading ? (
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent sm:size-5" />
            ) : isCompleted ? (
              <CheckCircle className="size-4 sm:size-5" />
            ) : (
              <Circle className="size-4 sm:size-5" />
            )}
            <span className="text-sm">{isCompleted ? '已完成' : '标记完成'}</span>
          </Button>

          {completion && (
            <div className="text-xs text-gray-500">
              <span className="hidden sm:inline">完成于 </span>
              {new Date(completion.created_at).toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
