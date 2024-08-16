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
          <div className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg bg-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-lg sm:size-[112px]">
            <i className={cn('aspect-square size-10 rounded border-none', icon)}></i>
            <div className="mt-3 text-sm text-gray-700 group-hover:text-gray-950">{title}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
