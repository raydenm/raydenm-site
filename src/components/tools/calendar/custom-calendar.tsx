'use client'

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HolidayUtil, Lunar, Solar } from 'lunar-typescript'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useKeyPress } from '@/hooks/useKeyPress'

import { DateDetails } from './date-details'
interface CalendarProps {
  onSelectDate?: (_date: Date) => void
}

/**
 * 获取指定日期的节日信息
 * @param date 日期
 * @returns 节日数组
 */
const getFestivals = (date: Date): string[] => {
  const lunar = Lunar.fromDate(date)
  const solar = Solar.fromDate(date)
  const data = [...(lunar.getJieQi() ? [lunar.getJieQi()] : []), ...lunar.getFestivals(), ...solar.getFestivals()]

  return data
}

export function CustomCalendar({ onSelectDate }: CalendarProps) {
  // 当前显示的月份
  const [currentDate, setCurrentDate] = useState(new Date())
  // 选中的日期
  const [selectedDate, setSelectedDate] = useState(new Date())

  const keyCodePathnameMapping: { [key: string]: (_data: Date) => Date } = {
    ArrowUp: (data: Date) => dayjs(data).subtract(7, 'day').toDate(),
    ArrowDown: (data: Date) => dayjs(data).add(7, 'day').toDate(),
    ArrowLeft: (data: Date) => dayjs(data).subtract(1, 'day').toDate(),
    ArrowRight: (data: Date) => dayjs(data).add(1, 'day').toDate()
  }

  useKeyPress(onKeyPress, Object.keys(keyCodePathnameMapping))

  function onKeyPress(event: { code: any }) {
    const key = event.code
    const getDate = keyCodePathnameMapping[key]
    if (getDate) {
      const newDate = getDate(selectedDate)
      setSelectedDate(newDate)
      setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1))
      onSelectDate && onSelectDate(newDate)
    }
  }

  /**
   * 切换到上一个月
   */
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  /**
   * 切换到下一个月
   */
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  /**
   * 处理日期点击事件
   * @param date 点击的日期
   */
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onSelectDate && onSelectDate(date)
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  /**
   * 处理年份变更
   * @param year 选择的年份
   */
  const handleYearChange = (year: string) => {
    setCurrentDate(new Date(parseInt(year), currentDate.getMonth(), 1))
  }

  /**
   * 处理月份变更
   * @param month 选择的月份
   */
  const handleMonthChange = (month: string) => {
    setCurrentDate(new Date(currentDate.getFullYear(), parseInt(month) - 1, 1))
  }

  /**
   * 跳转到今天
   */
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
    onSelectDate && onSelectDate(today)
  }

  /**
   * 渲染日历天数
   * @returns 渲染的日历天数数组
   */
  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    // 调整周一为每周的第一天
    let startingDayIndex = firstDayOfMonth.getDay() - 1
    if (startingDayIndex === -1) startingDayIndex = 6 // 周日变为6

    const days = []

    // 上个月的日期
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthLastDay - i)
      days.push(renderDay(date, true))
    }

    // 当前月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      days.push(renderDay(date, false))
    }

    // 下个月的日期（填充到6行）
    const totalDays = 6 * 7 // 6行，每行7天
    const daysNeeded = totalDays - days.length
    for (let i = 0; i < daysNeeded; i++) {
      const nextMonthDay = i + 1
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, nextMonthDay)
      days.push(renderDay(date, true))
    }

    return days
  }

  /**
   * 渲染单个日期
   * @param date 日期
   * @param isOutsideMonth 是否是当前月份以外的日期
   * @returns 渲染的日期按钮
   */
  const renderDay = (date: Date, isOutsideMonth: boolean) => {
    const lunar = Lunar.fromDate(date)
    const solar = Solar.fromDate(date)
    const holidayUtil = HolidayUtil.getHoliday(solar.toString())
    const isWork = holidayUtil?.isWork() // 是否调休
    const isSelected = dayjs(selectedDate).isSame(date, 'day')
    const isToday = new Date().toDateString() === date.toDateString()
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const festivals = getFestivals(date)
    const day = date.getDate()

    return (
      <div
        key={date.toISOString()}
        className={`relative flex h-[70px] w-full flex-col items-center justify-center rounded-lg border-2 border-transparent p-1 hover:border-2 hover:border-muted
          ${isSelected && !isToday ? 'border-2 !border-muted' : ''}
          ${isToday ? 'bg-blue-500 text-white hover:border-none' : ''}
          ${isWeekend ? 'text-red-500' : ''}
          ${isOutsideMonth ? 'opacity-40' : ''}
          ${isWork === true ? 'bg-[#f5f5f6] !text-primary dark:bg-[#262628]' : isWork === false ? 'bg-[#fef5f5] text-red-500 dark:bg-[#3b2f32]' : ''}`}
        onClick={() => handleDateClick(date)}
      >
        {isWork === true && (
          <div className="absolute right-[6px] top-[6px] rounded-sm bg-[#4e5877] p-0.5 text-xs leading-3 text-white">
            班
          </div>
        )}
        {isWork === false && (
          <div className="absolute right-[6px] top-[6px] rounded-sm bg-[#eb3333] p-0.5 text-xs leading-3 text-white">
            休
          </div>
        )}
        <span className={`text-lg font-bold leading-7`}>
          {day < 10 && '0'}
          {day}
        </span>
        {festivals.length > 0 ? (
          <span className={`w-full truncate text-center text-xs  ${isToday ? 'text-white' : 'text-blue-500'}`}>
            {festivals[0]}
          </span>
        ) : (
          <span className={`text-xs ${isToday ? 'text-white' : 'text-muted-foreground'}`}>
            {lunar.getDayInChinese()}
          </span>
        )}
      </div>
    )
  }

  /**
   * 生成年份选项
   * @returns 年份选项数组
   */
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear - 100; year <= currentYear + 100; year++) {
      years.push(
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      )
    }
    return years
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl bg-background">
      <div className="w-2/3 pr-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Select value={currentDate.getFullYear().toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="h-9 w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>{generateYearOptions()}</SelectContent>
            </Select>
            <Select value={(currentDate.getMonth() + 1).toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="h-9 w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {new Array(12).fill(0).map((_month, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* </div>
          <div className="flex items-center space-x-2"> */}
            <Button size="sm" variant="ghost" onClick={prevMonth}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={nextMonth}>
              <ChevronRight className="size-4" />
            </Button>
            {Solar.fromDate(new Date()).toYmd() !== Solar.fromDate(selectedDate).toYmd() && (
              <Button size="xs" className="bg-blue-500 text-sm text-white hover:bg-blue-500/80" onClick={goToToday}>
                今
              </Button>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {['一', '二', '三', '四', '五', '六', '日'].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-medium ${index === 5 || index === 6 ? 'text-red-500' : 'text-muted-foreground'}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="relative z-10 grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
          <div className="absolute top-0 z-0 flex size-full items-center justify-center text-[320px] text-black/[0.04] dark:text-white/5">
            {currentDate.getMonth() + 1}
          </div>
        </div>
      </div>
      <div className="w-1/3 border-l border-muted pl-8">{selectedDate && <DateDetails date={selectedDate} />}</div>
    </div>
  )
}
