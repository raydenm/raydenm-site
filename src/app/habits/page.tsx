'use client'

import { BarChart3, List, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { ScrollArea } from '@/components/common/scroll-area'
import { HabitCard } from '@/components/habits/habit-card'
import { HabitForm } from '@/components/habits/habit-form'
import { HabitStats } from '@/components/habits/habit-stats'
import { LoadingOverlay } from '@/components/habits/loading-overlay'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import {
  Habit,
  habitCategoriesService,
  HabitCategory,
  HabitCompletion,
  habitCompletionsService,
  HabitError,
  habitsService,
  habitStatsService
} from '@/services/supabase/habits'

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [categories, setCategories] = useState<HabitCategory[]>([])
  const [todayCompletions, setTodayCompletions] = useState<HabitCompletion[]>([])
  const [todayStats, setTodayStats] = useState({ total: 0, completed: 0, rate: 0 })
  const [weeklyStats, setWeeklyStats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [selectedFrequency, setSelectedFrequency] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all')

  // 细粒度的loading状态
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean
  }>({})

  // 操作loading状态管理
  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: loading }))
  }

  const isOperationLoading = (key: string) => loadingStates[key] || false

  // 更新今日统计
  const updateTodayStats = () => {
    const total = habits.filter((h) => h.is_active).length
    const completed = todayCompletions.length
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0
    setTodayStats({ total, completed, rate })
  }

  // 获取基础数据
  const fetchBasicData = async () => {
    try {
      setIsLoading(true)
      const today = new Date().toISOString().split('T')[0] || ''

      const [habitsData, categoriesData, completionsData] = await Promise.all([
        habitsService.getAll(),
        habitCategoriesService.getAll(),
        habitCompletionsService.getByDate(today)
      ])

      setHabits(habitsData)
      setCategories(categoriesData)
      setTodayCompletions(completionsData)

      // 计算今日统计
      const total = habitsData.filter((h) => h.is_active).length
      const completed = completionsData.length
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0
      setTodayStats({ total, completed, rate })
    } catch (error) {
      console.error('Error fetching basic data:', error)
      if (error instanceof HabitError) {
        toast.error(error.message)
      } else {
        toast.error('加载数据失败')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 获取统计数据（按需加载）
  const fetchStatsData = async () => {
    try {
      const weeklyStatsData = await habitStatsService.getWeeklyStats()
      setWeeklyStats(weeklyStatsData)
    } catch (error) {
      console.error('Error fetching stats:', error)
      if (error instanceof HabitError) {
        toast.error(error.message)
      } else {
        toast.error('加载统计数据失败')
      }
    }
  }

  useEffect(() => {
    fetchBasicData()
  }, [])

  // 切换习惯完成状态
  const handleToggleCompletion = async (habitId: string) => {
    const loadingKey = `toggle-${habitId}`
    try {
      setLoading(loadingKey, true)
      const today = new Date().toISOString().split('T')[0] || ''
      const result = await habitCompletionsService.toggleCompletion(habitId, today)

      // 局部更新完成记录
      if (result) {
        // 添加完成记录
        setTodayCompletions((prev) => [...prev, result])
      } else {
        // 移除完成记录
        setTodayCompletions((prev) => prev.filter((c) => c.habit_id !== habitId))
      }

      // 更新今日统计
      updateTodayStats()
      toast.success('状态已更新')
    } catch (error) {
      console.error('Error toggling completion:', error)
      if (error instanceof HabitError) {
        toast.error(error.message)
      } else {
        toast.error('操作失败')
      }
    } finally {
      setLoading(loadingKey, false)
    }
  }

  // 创建或更新习惯
  const handleSubmitHabit = async (data: any) => {
    const loadingKey = 'submit-habit'
    try {
      setLoading(loadingKey, true)

      if (editingHabit) {
        const updatedHabit = await habitsService.update(editingHabit.id, data)
        // 局部更新习惯列表
        setHabits((prev) => prev.map((h) => (h.id === editingHabit.id ? updatedHabit : h)))
        toast.success('习惯已更新')
      } else {
        const newHabit = await habitsService.create(data)
        // 局部添加新习惯
        setHabits((prev) => [newHabit, ...prev])
        toast.success('习惯已创建')
      }

      // 更新今日统计
      updateTodayStats()
      setShowForm(false)
      setEditingHabit(null)
    } catch (error) {
      console.error('Error saving habit:', error)
      if (error instanceof HabitError) {
        toast.error(error.message)
      } else {
        toast.error('保存失败')
      }
    } finally {
      setLoading(loadingKey, false)
    }
  }

  // 删除习惯
  const handleDeleteHabit = async (habitId: string) => {
    if (!confirm('确定要删除这个习惯吗？')) return

    const loadingKey = `delete-${habitId}`
    try {
      setLoading(loadingKey, true)
      await habitsService.delete(habitId)

      // 局部删除习惯
      setHabits((prev) => prev.filter((h) => h.id !== habitId))
      // 删除相关的完成记录
      setTodayCompletions((prev) => prev.filter((c) => c.habit_id !== habitId))
      // 更新今日统计
      updateTodayStats()

      toast.success('习惯已删除')
    } catch (error) {
      console.error('Error deleting habit:', error)
      if (error instanceof HabitError) {
        toast.error(error.message)
      } else {
        toast.error('删除失败')
      }
    } finally {
      setLoading(loadingKey, false)
    }
  }

  // 切换习惯激活状态
  const handleToggleActive = async (habitId: string) => {
    const loadingKey = `toggle-active-${habitId}`
    try {
      setLoading(loadingKey, true)
      const updatedHabit = await habitsService.toggleActive(habitId)

      // 局部更新习惯状态
      setHabits((prev) => prev.map((h) => (h.id === habitId ? updatedHabit : h)))
      // 更新今日统计
      updateTodayStats()

      toast.success('状态已更新')
    } catch (error) {
      console.error('Error toggling habit:', error)
      if (error instanceof HabitError) {
        toast.error(error.message)
      } else {
        toast.error('操作失败')
      }
    } finally {
      setLoading(loadingKey, false)
    }
  }

  // 编辑习惯
  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit)
    setShowForm(true)
  }

  // 打开统计对话框
  const handleOpenStats = async () => {
    setShowStats(true)
    // 只在打开时加载统计数据
    if (weeklyStats.length === 0) {
      await fetchStatsData()
    }
  }

  // 获取习惯的今日完成状态
  const getHabitCompletion = (habitId: string) => {
    return todayCompletions.find((c) => c.habit_id === habitId)
  }

  // 根据频率筛选习惯
  const filteredHabits = habits.filter((habit) => {
    if (selectedFrequency === 'all') return true
    return habit.frequency === selectedFrequency
  })

  // 获取各频率的习惯数量
  const frequencyCounts = {
    all: habits.length,
    daily: habits.filter((h) => h.frequency === 'daily').length,
    weekly: habits.filter((h) => h.frequency === 'weekly').length,
    monthly: habits.filter((h) => h.frequency === 'monthly').length
  }

  // 计算各频率的完成统计
  const frequencyStats = {
    daily: {
      total: habits.filter((h) => h.frequency === 'daily' && h.is_active).length,
      completed: todayCompletions.filter((c) => {
        const habit = habits.find((h) => h.id === c.habit_id)
        return habit?.frequency === 'daily'
      }).length,
      rate: 0
    },
    weekly: {
      total: habits.filter((h) => h.frequency === 'weekly' && h.is_active).length,
      completed: todayCompletions.filter((c) => {
        const habit = habits.find((h) => h.id === c.habit_id)
        return habit?.frequency === 'weekly'
      }).length,
      rate: 0
    },
    monthly: {
      total: habits.filter((h) => h.frequency === 'monthly' && h.is_active).length,
      completed: todayCompletions.filter((c) => {
        const habit = habits.find((h) => h.id === c.habit_id)
        return habit?.frequency === 'monthly'
      }).length,
      rate: 0
    }
  }

  // 计算各频率的完成率
  frequencyStats.daily.rate =
    frequencyStats.daily.total > 0 ? Math.round((frequencyStats.daily.completed / frequencyStats.daily.total) * 100) : 0
  frequencyStats.weekly.rate =
    frequencyStats.weekly.total > 0
      ? Math.round((frequencyStats.weekly.completed / frequencyStats.weekly.total) * 100)
      : 0
  frequencyStats.monthly.rate =
    frequencyStats.monthly.total > 0
      ? Math.round((frequencyStats.monthly.completed / frequencyStats.monthly.total) * 100)
      : 0

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">加载中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea>
      <div className="container mx-auto min-h-screen p-4 sm:py-6">
        {/* 头部 */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">习惯养成</h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">培养好习惯，成就更好的自己</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" size="sm" onClick={handleOpenStats} className="flex items-center gap-1 sm:gap-2">
              <BarChart3 className="size-3 sm:size-4" />
              <span className="hidden sm:inline">统计</span>
            </Button>
            <Button size="sm" onClick={() => setShowForm(true)} className="flex items-center gap-1 sm:gap-2">
              <Plus className="size-3 sm:size-4" />
              <span className="hidden sm:inline">添加习惯</span>
            </Button>
          </div>
        </div>

        {/* 今日进度概览 */}
        <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">今日进度</h2>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                已完成 {todayStats.completed} / {todayStats.total} 个习惯
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 sm:text-3xl">{todayStats.rate}%</div>
              <div className="text-xs text-gray-500 sm:text-sm">完成率</div>
            </div>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200 sm:mt-4">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-300"
              style={{ width: `${todayStats.rate}%` }}
            />
          </div>
        </div>

        {/* 习惯列表 */}
        <div className="space-y-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <List className="size-4 text-gray-600 sm:size-5" />
              <h2 className="text-lg font-semibold sm:text-xl">我的习惯</h2>
              <span className="text-xs text-gray-500 sm:text-sm">
                ({filteredHabits.filter((h) => h.is_active).length} 个活跃)
              </span>
            </div>
          </div>

          {/* 频率筛选器 */}
          <div className="flex gap-1 rounded-lg border bg-muted/50 p-1">
            {[
              { key: 'all', label: '全部', count: frequencyCounts.all },
              { key: 'daily', label: '每日', count: frequencyCounts.daily },
              { key: 'weekly', label: '每周', count: frequencyCounts.weekly },
              { key: 'monthly', label: '每月', count: frequencyCounts.monthly }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setSelectedFrequency(key as any)}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
                  selectedFrequency === key
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span>{label}</span>
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">{count}</span>
              </button>
            ))}
          </div>

          {filteredHabits.length === 0 ? (
            <div className="py-8 text-center sm:py-12">
              <div className="mb-3 text-gray-400 sm:mb-4">
                <Plus className="mx-auto size-8 sm:size-12" />
              </div>
              <h3 className="mb-2 text-base font-medium text-gray-900 sm:text-lg">还没有习惯</h3>
              <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">开始创建你的第一个习惯吧！</p>
              <Button size="sm" onClick={() => setShowForm(true)}>
                <Plus className="mr-1 size-3 sm:mr-2 sm:size-4" />
                添加习惯
              </Button>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHabits.map((habit) => (
                <LoadingOverlay key={habit.id} isLoading={isOperationLoading(`delete-${habit.id}`)}>
                  <HabitCard
                    habit={habit}
                    completion={getHabitCompletion(habit.id)}
                    onToggleCompletion={handleToggleCompletion}
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit}
                    onToggleActive={handleToggleActive}
                    isLoading={isOperationLoading(`toggle-${habit.id}`)}
                    isDeleting={isOperationLoading(`delete-${habit.id}`)}
                    isTogglingActive={isOperationLoading(`toggle-active-${habit.id}`)}
                  />
                </LoadingOverlay>
              ))}
            </div>
          )}
        </div>

        {/* 习惯表单对话框 */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-sm sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">{editingHabit ? '编辑习惯' : '创建新习惯'}</DialogTitle>
            </DialogHeader>
            <HabitForm
              habit={editingHabit || undefined}
              categories={categories}
              onSubmit={handleSubmitHabit}
              onCancel={() => {
                setShowForm(false)
                setEditingHabit(null)
              }}
              isLoading={isOperationLoading('submit-habit')}
            />
          </DialogContent>
        </Dialog>

        {/* 统计对话框 */}
        <Dialog open={showStats} onOpenChange={setShowStats}>
          <DialogContent className="max-h-[80vh] max-w-sm overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-1.5 text-lg sm:gap-2 sm:text-xl">
                <BarChart3 className="size-4 sm:size-5" />
                习惯统计
              </DialogTitle>
            </DialogHeader>
            <HabitStats todayStats={todayStats} weeklyStats={weeklyStats} frequencyStats={frequencyStats} />
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  )
}
