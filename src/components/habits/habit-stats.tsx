'use client'

import { CheckCircle, Target, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface TodayStats {
  total: number
  completed: number
  rate: number
}

interface WeeklyStats {
  date: string
  completed: number
  total: number
  rate: number
}

interface HabitStatsProps {
  todayStats: TodayStats
  weeklyStats: WeeklyStats[]
  frequencyStats?: {
    daily: { total: number; completed: number; rate: number }
    weekly: { total: number; completed: number; rate: number }
    monthly: { total: number; completed: number; rate: number }
  }
}

export function HabitStats({ todayStats, weeklyStats, frequencyStats }: HabitStatsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return '今天'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天'
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 今日统计 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-1.5 text-base sm:gap-2 sm:text-lg">
            <CheckCircle className="size-4 text-green-600 sm:size-5" />
            今日进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 sm:text-sm">完成进度</span>
              <span className="text-xs font-medium sm:text-sm">
                {todayStats.completed} / {todayStats.total}
              </span>
            </div>
            <Progress value={todayStats.rate} className="h-2" />
            <div className="text-center">
              <span className="text-xl font-bold text-green-600 sm:text-2xl">{todayStats.rate}%</span>
              <p className="text-xs text-gray-500 sm:text-sm">
                {todayStats.completed === todayStats.total
                  ? '太棒了！今天的目标都完成了！'
                  : `还有 ${todayStats.total - todayStats.completed} 个习惯待完成`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 本周趋势 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-1.5 text-base sm:gap-2 sm:text-lg">
            <TrendingUp className="size-4 text-blue-600 sm:size-5" />
            本周趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {weeklyStats.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="w-10 text-xs text-gray-600 sm:w-12 sm:text-sm">{formatDate(day.date)}</span>
                <div className="mx-2 flex-1 sm:mx-4">
                  <Progress value={day.rate} className="h-2" />
                </div>
                <span className="w-10 text-right text-xs font-medium sm:w-12 sm:text-sm">
                  {day.completed}/{day.total}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 border-t pt-3 sm:mt-4 sm:pt-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-600">本周平均完成率</span>
              <span className="font-medium">
                {Math.round(weeklyStats.reduce((sum, day) => sum + day.rate, 0) / weeklyStats.length)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速统计 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Target className="size-3 text-blue-600 sm:size-4" />
              <span className="text-xs text-gray-600 sm:text-sm">活跃习惯</span>
            </div>
            <p className="mt-1.5 text-xl font-bold sm:mt-2 sm:text-2xl">{todayStats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="size-3 text-green-600 sm:size-4" />
              <span className="text-xs text-gray-600 sm:text-sm">今日完成</span>
            </div>
            <p className="mt-1.5 text-xl font-bold sm:mt-2 sm:text-2xl">{todayStats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* 频率统计 */}
      {frequencyStats && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">按频率统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { key: 'daily', label: '每日习惯', color: 'text-blue-600', stats: frequencyStats.daily },
                { key: 'weekly', label: '每周习惯', color: 'text-green-600', stats: frequencyStats.weekly },
                { key: 'monthly', label: '每月习惯', color: 'text-orange-600', stats: frequencyStats.monthly }
              ].map(({ key, label, color, stats }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{label}</span>
                    <span className={`text-sm font-bold ${color}`}>
                      {stats.completed}/{stats.total}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={stats.rate} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>完成率</span>
                      <span>{stats.rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
