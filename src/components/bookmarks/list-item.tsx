'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type ListItemProps = {
  title: string
  description: string
  path: string
}

export const ListItem = ({ title, description, path }: ListItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        'flex flex-col gap-1 rounded-lg p-2',
        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
      )}
    >
      <span className="font-medium">{title}</span>
      {description && <span className="text-muted-foreground">{description}</span>}
    </Link>
  )
}
