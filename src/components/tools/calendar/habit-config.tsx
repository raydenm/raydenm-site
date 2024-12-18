import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface Habit {
  id: string
  name: string
  targetCount: number
}

interface HabitConfigProps {
  habits: Habit[]
  onSave: (_habits: Habit[]) => void
}

export function HabitConfig({ habits: initialHabits, onSave }: HabitConfigProps) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)
  const [newHabit, setNewHabit] = useState<Habit>({ id: '', name: '', targetCount: 1 })

  const addHabit = () => {
    if (newHabit.name) {
      setHabits([...habits, { ...newHabit, id: Date.now().toString() }])
      setNewHabit({ id: '', name: '', targetCount: 1 })
    }
  }

  const removeHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const updateHabit = (id: string, field: keyof Habit, value: string | number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, [field]: field === 'targetCount' ? Math.max(1, Number(value)) : value } : habit
      )
    )
  }

  const handleSave = () => {
    onSave(habits)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">配置习惯</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>配置每日习惯</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center gap-2">
              <Input
                value={habit.name}
                onChange={(e) => updateHabit(habit.id, 'name', e.target.value)}
                placeholder="习惯名称"
              />
              <Input
                type="number"
                value={habit.targetCount}
                onChange={(e) => updateHabit(habit.id, 'targetCount', e.target.value)}
                placeholder="目标次数"
                className="w-20"
                min="1"
              />
              <Button onClick={() => removeHabit(habit.id)} variant="destructive" size="icon">
                X
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              placeholder="新习惯名称"
            />
            <Input
              type="number"
              value={newHabit.targetCount}
              onChange={(e) => setNewHabit({ ...newHabit, targetCount: Math.max(1, Number(e.target.value)) })}
              placeholder="目标次数"
              className="w-20"
              min="1"
            />
            <Button onClick={addHabit} variant="secondary" size="icon">
              +
            </Button>
          </div>
        </div>
        <Button onClick={handleSave}>保存配置</Button>
      </DialogContent>
    </Dialog>
  )
}
