import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

import { HabitConfig } from './habit-config'

interface Habit {
  id: string
  name: string
  targetCount: number
}

interface HabitData {
  [date: string]: {
    [habitId: string]: number
  }
}

interface HabitTrackerProps {
  date: Date
}

const defaultConfig: Habit[] = [
  { id: 'water', name: '喝水', targetCount: 8 },
  { id: 'exercise', name: '运动', targetCount: 1 },
  { id: 'read', name: '阅读', targetCount: 1 }
]

export function HabitTracker({ date }: HabitTrackerProps) {
  const dateString = dayjs(date).format('YYYY-MM-DD')
  const [habits, setHabits] = useState<Habit[]>(defaultConfig)
  const [habitData, setHabitData] = useState<HabitData>({})

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits')
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits))
    }

    const storedData = localStorage.getItem('habitData')
    if (storedData) {
      setHabitData(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    localStorage.setItem('habitData', JSON.stringify(habitData))
  }, [habitData])

  const updateHabitProgress = (habitId: string, newValue: number) => {
    setHabitData((prevData) => {
      const newData = { ...prevData }
      if (!newData[dateString]) {
        newData[dateString] = {}
      }
      newData[dateString][habitId] = newValue
      return newData
    })
  }

  const incrementHabit = (habitId: string) => {
    setHabitData((prevData) => {
      const newData = { ...prevData }
      if (!newData[dateString]) {
        newData[dateString] = {}
      }
      const currentValue = newData[dateString][habitId] || 0
      const habit = habits.find((h) => h.id === habitId)
      if (habit) {
        newData[dateString][habitId] = Math.min(currentValue + 1, habit.targetCount)
      }
      return newData
    })
  }

  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">每日习惯</h3>
        <HabitConfig habits={habits} onSave={saveHabits} />
      </div>
      {habits.map((habit) => (
        <div key={habit.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{habit.name}</span>
            <span>
              {habitData[dateString]?.[habit.id] || 0} / {habit.targetCount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Slider
              min={0}
              max={habit.targetCount}
              step={1}
              value={[habitData[dateString]?.[habit.id] || 0]}
              onValueChange={(value) => updateHabitProgress(habit.id, value[0] || 0)}
              className="grow"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => incrementHabit(habit.id)}
              disabled={(habitData[dateString]?.[habit.id] || 0) >= habit.targetCount}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
