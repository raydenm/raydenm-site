import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// 错误处理工具
export class HabitError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'HabitError'
  }
}

// 验证工具
const validateHabit = (data: any) => {
  if (!data.title || data.title.trim().length === 0) {
    throw new HabitError('习惯标题不能为空', 400)
  }
  if (data.title.length > 200) {
    throw new HabitError('习惯标题不能超过200字符', 400)
  }
  if (data.target_count && (data.target_count < 1 || data.target_count > 100)) {
    throw new HabitError('目标次数必须在1-100之间', 400)
  }
  if (data.frequency && !['daily', 'weekly', 'monthly'].includes(data.frequency)) {
    throw new HabitError('频率必须是 daily、weekly 或 monthly', 400)
  }
}

export interface HabitCategory {
  id: string
  name: string
  color: string
  icon: string
  created_at: string
  updated_at: string
}

export interface Habit {
  id: string
  title: string
  description?: string
  category_id?: string
  frequency: 'daily' | 'weekly' | 'monthly'
  target_count: number
  is_active: boolean
  reminder_time?: string
  created_at: string
  updated_at: string
  category?: HabitCategory
}

export interface HabitCompletion {
  id: string
  habit_id: string
  completion_date: string
  completed_count: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface HabitWithCompletion extends Habit {
  today_completion?: HabitCompletion
  completion_rate?: number
}

// 习惯分类相关
export const habitCategoriesService = {
  async getAll(): Promise<HabitCategory[]> {
    try {
      const { data, error } = await supabase.from('habit_categories').select('*').order('name')

      if (error) throw new HabitError(`获取分类失败: ${error.message}`)
      return data || []
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取分类时发生未知错误')
    }
  },

  async create(category: Omit<HabitCategory, 'id' | 'created_at' | 'updated_at'>): Promise<HabitCategory> {
    try {
      if (!category.name || category.name.trim().length === 0) {
        throw new HabitError('分类名称不能为空', 400)
      }
      if (category.name.length > 100) {
        throw new HabitError('分类名称不能超过100字符', 400)
      }

      const { data, error } = await supabase.from('habit_categories').insert(category).select().single()

      if (error) throw new HabitError(`创建分类失败: ${error.message}`)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('创建分类时发生未知错误')
    }
  },

  async update(id: string, updates: Partial<HabitCategory>): Promise<HabitCategory> {
    try {
      if (updates.name && updates.name.trim().length === 0) {
        throw new HabitError('分类名称不能为空', 400)
      }
      if (updates.name && updates.name.length > 100) {
        throw new HabitError('分类名称不能超过100字符', 400)
      }

      const { data, error } = await supabase.from('habit_categories').update(updates).eq('id', id).select().single()

      if (error) throw new HabitError(`更新分类失败: ${error.message}`)
      if (!data) throw new HabitError('分类不存在', 404)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('更新分类时发生未知错误')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      // 检查是否有习惯使用此分类
      const { data: habits, error: habitsError } = await supabase
        .from('habits')
        .select('id')
        .eq('category_id', id)
        .limit(1)

      if (habitsError) throw new HabitError(`检查分类使用情况失败: ${habitsError.message}`)
      if (habits && habits.length > 0) {
        throw new HabitError('该分类下还有习惯，无法删除', 400)
      }

      const { error } = await supabase.from('habit_categories').delete().eq('id', id)

      if (error) throw new HabitError(`删除分类失败: ${error.message}`)
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('删除分类时发生未知错误')
    }
  }
}

// 习惯相关
export const habitsService = {
  async getAll(): Promise<Habit[]> {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select(
          `
          *,
          category:habit_categories(*)
        `
        )
        .order('created_at', { ascending: false })

      if (error) throw new HabitError(`获取习惯列表失败: ${error.message}`)
      return data || []
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取习惯列表时发生未知错误')
    }
  },

  async getActive(): Promise<Habit[]> {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select(
          `
          *,
          category:habit_categories(*)
        `
        )
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw new HabitError(`获取活跃习惯失败: ${error.message}`)
      return data || []
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取活跃习惯时发生未知错误')
    }
  },

  async getById(id: string): Promise<Habit> {
    try {
      if (!id) throw new HabitError('习惯ID不能为空', 400)

      const { data, error } = await supabase
        .from('habits')
        .select(
          `
          *,
          category:habit_categories(*)
        `
        )
        .eq('id', id)
        .single()

      if (error) throw new HabitError(`获取习惯失败: ${error.message}`)
      if (!data) throw new HabitError('习惯不存在', 404)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取习惯时发生未知错误')
    }
  },

  async create(habit: Omit<Habit, 'id' | 'created_at' | 'updated_at'>): Promise<Habit> {
    try {
      validateHabit(habit)

      // 如果指定了分类，验证分类是否存在
      if (habit.category_id) {
        const { data: category } = await supabase
          .from('habit_categories')
          .select('id')
          .eq('id', habit.category_id)
          .single()

        if (!category) {
          throw new HabitError('指定的分类不存在', 400)
        }
      }

      const { data, error } = await supabase
        .from('habits')
        .insert(habit)
        .select(
          `
          *,
          category:habit_categories(*)
        `
        )
        .single()

      if (error) throw new HabitError(`创建习惯失败: ${error.message}`)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('创建习惯时发生未知错误')
    }
  },

  async update(id: string, updates: Partial<Habit>): Promise<Habit> {
    try {
      if (!id) throw new HabitError('习惯ID不能为空', 400)
      validateHabit(updates)

      // 如果指定了分类，验证分类是否存在
      if (updates.category_id) {
        const { data: category } = await supabase
          .from('habit_categories')
          .select('id')
          .eq('id', updates.category_id)
          .single()

        if (!category) {
          throw new HabitError('指定的分类不存在', 400)
        }
      }

      const { data, error } = await supabase
        .from('habits')
        .update(updates)
        .eq('id', id)
        .select(
          `
          *,
          category:habit_categories(*)
        `
        )
        .single()

      if (error) throw new HabitError(`更新习惯失败: ${error.message}`)
      if (!data) throw new HabitError('习惯不存在', 404)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('更新习惯时发生未知错误')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      if (!id) throw new HabitError('习惯ID不能为空', 400)

      // 先删除相关的完成记录
      const { error: completionsError } = await supabase.from('habit_completions').delete().eq('habit_id', id)

      if (completionsError) {
        throw new HabitError(`删除完成记录失败: ${completionsError.message}`)
      }

      const { error } = await supabase.from('habits').delete().eq('id', id)

      if (error) throw new HabitError(`删除习惯失败: ${error.message}`)
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('删除习惯时发生未知错误')
    }
  },

  async toggleActive(id: string): Promise<Habit> {
    try {
      if (!id) throw new HabitError('习惯ID不能为空', 400)

      const { data: current, error: currentError } = await supabase
        .from('habits')
        .select('is_active')
        .eq('id', id)
        .single()

      if (currentError) throw new HabitError(`获取习惯状态失败: ${currentError.message}`)
      if (!current) throw new HabitError('习惯不存在', 404)

      const { data, error } = await supabase
        .from('habits')
        .update({ is_active: !current.is_active })
        .eq('id', id)
        .select(
          `
          *,
          category:habit_categories(*)
        `
        )
        .single()

      if (error) throw new HabitError(`切换习惯状态失败: ${error.message}`)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('切换习惯状态时发生未知错误')
    }
  }
}

// 习惯完成记录相关
export const habitCompletionsService = {
  async getByDate(date: string): Promise<HabitCompletion[]> {
    try {
      if (!date) throw new HabitError('日期不能为空', 400)

      const { data, error } = await supabase.from('habit_completions').select('*').eq('completion_date', date)

      if (error) throw new HabitError(`获取完成记录失败: ${error.message}`)
      return data || []
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取完成记录时发生未知错误')
    }
  },

  async getByHabitAndDate(habitId: string, date: string): Promise<HabitCompletion | null> {
    try {
      if (!habitId) throw new HabitError('习惯ID不能为空', 400)
      if (!date) throw new HabitError('日期不能为空', 400)

      const { data, error } = await supabase
        .from('habit_completions')
        .select('*')
        .eq('habit_id', habitId)
        .eq('completion_date', date)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw new HabitError(`获取完成记录失败: ${error.message}`)
      }
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取完成记录时发生未知错误')
    }
  },

  async getByHabit(habitId: string, startDate?: string, endDate?: string): Promise<HabitCompletion[]> {
    try {
      if (!habitId) throw new HabitError('习惯ID不能为空', 400)

      let query = supabase
        .from('habit_completions')
        .select('*')
        .eq('habit_id', habitId)
        .order('completion_date', { ascending: false })

      if (startDate) {
        query = query.gte('completion_date', startDate)
      }
      if (endDate) {
        query = query.lte('completion_date', endDate)
      }

      const { data, error } = await query

      if (error) throw new HabitError(`获取习惯完成记录失败: ${error.message}`)
      return data || []
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取习惯完成记录时发生未知错误')
    }
  },

  async create(completion: Omit<HabitCompletion, 'id' | 'created_at' | 'updated_at'>): Promise<HabitCompletion> {
    try {
      if (!completion.habit_id) throw new HabitError('习惯ID不能为空', 400)
      if (!completion.completion_date) throw new HabitError('完成日期不能为空', 400)
      if (completion.completed_count && completion.completed_count < 1) {
        throw new HabitError('完成次数必须大于0', 400)
      }

      // 验证习惯是否存在
      const { data: habit } = await supabase.from('habits').select('id').eq('id', completion.habit_id).single()

      if (!habit) {
        throw new HabitError('习惯不存在', 404)
      }

      const { data, error } = await supabase.from('habit_completions').insert(completion).select().single()

      if (error) throw new HabitError(`创建完成记录失败: ${error.message}`)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('创建完成记录时发生未知错误')
    }
  },

  async update(id: string, updates: Partial<HabitCompletion>): Promise<HabitCompletion> {
    try {
      if (!id) throw new HabitError('完成记录ID不能为空', 400)
      if (updates.completed_count && updates.completed_count < 1) {
        throw new HabitError('完成次数必须大于0', 400)
      }

      const { data, error } = await supabase.from('habit_completions').update(updates).eq('id', id).select().single()

      if (error) throw new HabitError(`更新完成记录失败: ${error.message}`)
      if (!data) throw new HabitError('完成记录不存在', 404)
      return data
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('更新完成记录时发生未知错误')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      if (!id) throw new HabitError('完成记录ID不能为空', 400)

      const { error } = await supabase.from('habit_completions').delete().eq('id', id)

      if (error) throw new HabitError(`删除完成记录失败: ${error.message}`)
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('删除完成记录时发生未知错误')
    }
  },

  async toggleCompletion(habitId: string, date: string, completedCount: number = 1): Promise<HabitCompletion | null> {
    try {
      if (!habitId) throw new HabitError('习惯ID不能为空', 400)
      if (!date) throw new HabitError('日期不能为空', 400)
      if (completedCount < 1) throw new HabitError('完成次数必须大于0', 400)

      const existing = await this.getByHabitAndDate(habitId, date)

      if (existing) {
        // 如果已存在，删除记录（取消完成）
        await this.delete(existing.id)
        return null
      } else {
        // 如果不存在，创建记录（标记完成）
        return await this.create({
          habit_id: habitId,
          completion_date: date,
          completed_count: completedCount
        })
      }
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('切换完成状态时发生未知错误')
    }
  }
}

// 统计相关
export const habitStatsService = {
  async getCompletionRate(habitId: string, days: number = 30): Promise<number> {
    try {
      if (!habitId) throw new HabitError('习惯ID不能为空', 400)
      if (days < 1) throw new HabitError('天数必须大于0', 400)

      const endDate = new Date().toISOString().split('T')[0] || ''
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || ''

      const completions = await habitCompletionsService.getByHabit(habitId, startDate, endDate)
      const totalDays = days
      const completedDays = completions.length

      return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('计算完成率时发生未知错误')
    }
  },

  async getTodayStats(): Promise<{ total: number; completed: number; rate: number }> {
    try {
      const today = new Date().toISOString().split('T')[0] || ''
      const activeHabits = await habitsService.getActive()
      const todayCompletions = await habitCompletionsService.getByDate(today)

      const total = activeHabits.length
      const completed = todayCompletions.length
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0

      return { total, completed, rate }
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取今日统计时发生未知错误')
    }
  },

  async getWeeklyStats(): Promise<{ date: string; completed: number; total: number; rate: number }[]> {
    try {
      const activeHabits = await habitsService.getActive()
      const total = activeHabits.length

      const stats: { date: string; completed: number; total: number; rate: number }[] = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || ''
        const completions = await habitCompletionsService.getByDate(date)
        const completed = completions.length
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0

        stats.push({ date, completed, total, rate })
      }

      return stats
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取周统计时发生未知错误')
    }
  },

  async getHabitStats(habitId: string): Promise<{
    totalCompletions: number
    currentStreak: number
    longestStreak: number
    completionRate: number
    lastCompleted: string | null
  }> {
    try {
      if (!habitId) throw new HabitError('习惯ID不能为空', 400)

      // 获取所有完成记录
      const completions = await habitCompletionsService.getByHabit(habitId)

      // 计算总完成次数
      const totalCompletions = completions.reduce((sum, c) => sum + c.completed_count, 0)

      // 计算当前连续天数
      let currentStreak = 0
      let longestStreak = 0
      let tempStreak = 0
      let lastCompleted: string | null = null

      if (completions.length > 0) {
        lastCompleted = completions[0]?.completion_date || null

        // 按日期排序
        const sortedDates = completions
          .map((c) => c.completion_date)
          .filter((date) => date) // 过滤掉undefined
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

        // 计算当前连续天数
        let currentDate = new Date()
        for (const date of sortedDates) {
          const dateStr = new Date(date).toISOString().split('T')[0] || ''
          const expectedDate = currentDate.toISOString().split('T')[0] || ''

          if (dateStr === expectedDate) {
            currentStreak++
            tempStreak++
            currentDate.setDate(currentDate.getDate() - 1)
          } else if (dateStr < expectedDate) {
            break
          }
        }

        // 计算最长连续天数
        tempStreak = 0
        for (let i = 0; i < sortedDates.length; i++) {
          if (i === 0) {
            tempStreak = 1
          } else {
            const prevDate = new Date(sortedDates[i - 1] || '')
            const currDate = new Date(sortedDates[i] || '')
            const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24))

            if (diffDays === 1) {
              tempStreak++
            } else {
              longestStreak = Math.max(longestStreak, tempStreak)
              tempStreak = 1
            }
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak)
      }

      // 计算完成率（最近30天）
      const completionRate = await this.getCompletionRate(habitId, 30)

      return {
        totalCompletions,
        currentStreak,
        longestStreak,
        completionRate,
        lastCompleted
      }
    } catch (error) {
      if (error instanceof HabitError) throw error
      throw new HabitError('获取习惯统计时发生未知错误')
    }
  }
}
