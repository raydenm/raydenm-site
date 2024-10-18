'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { flushSync } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const SystemThemeIcon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M512 938.666667c235.648 0 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667z m0-64v-725.333334a362.666667 362.666667 0 0 1 0 725.333334z"
      fill="currentColor"
    ></path>
  </svg>
)

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const themeRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const themeMap = [
    {
      value: 'light',
      lable: '亮色主题',
      icon: <Sun size={16} className="mr-2" />
    },
    {
      value: 'dark',
      lable: '暗黑主题',
      icon: <Moon size={16} className="mr-2" />
    },
    {
      value: 'system',
      lable: '跟随系统',
      icon: <SystemThemeIcon className="mr-2 size-4" />
    }
  ]

  const transitionViewIfSupported = (updateCb: () => any) => {
    if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
      updateCb()
      return
    }
    if (document.startViewTransition) {
      document.startViewTransition(updateCb)
    } else {
      updateCb()
    }
  }

  const buildThemeTransition = (value: string) => {
    if (theme === value) {
      return
    }
    transitionViewIfSupported(() => {
      flushSync(() => setTheme(value))
    })
  }

  useEffect(() => {
    if (themeRef.current) {
      const rect = themeRef.current.getBoundingClientRect()
      const { top, left } = rect
      document.documentElement.style.setProperty('--themeswitch-x', `${left + 18}px`)
      document.documentElement.style.setProperty('--themeswitch-y', `${top}px`)
    }
    setIsClient(true)
  }, [isClient])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        {isClient && (
          <div ref={themeRef} className="flex cursor-pointer rounded-full p-2 text-[#6B7785] hover:bg-muted">
            {theme === 'system' && <SystemThemeIcon className="size-5" />}
            {theme === 'light' && <Sun size={20} />}
            {theme === 'dark' && <Moon size={20} />}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-1 ml-2 flex flex-col gap-1">
        {themeMap.map(({ value, icon, lable }) => (
          <DropdownMenuItem
            key={value}
            className={cn('rounded-md px-3', theme === value && '!bg-primary !text-primary-foreground')}
            onClick={() => buildThemeTransition(value)}
          >
            {icon}
            {lable}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
