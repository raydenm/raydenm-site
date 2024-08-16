import { STACK_LIST } from '@/config'
import { cn } from '@/lib/utils'

export const StackList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap">
      {STACK_LIST.map(({ title, icon, url }, key) => (
        <a
          key={key}
          href={`${url}?ref=${process.env.NEXT_PUBLIC_WEBSITE_URL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="drak:bg-muted group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg bg-card text-card-foreground shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:size-[112px]">
            <i className={cn('aspect-square size-10 rounded border-none', icon)}></i>
            <div className="mt-3 text-sm">{title}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
