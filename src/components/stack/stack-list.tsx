import { STACK_LIST } from '@/lib/constants'

export const StackList = () => {
  return (
    <div className="grid grid-cols-3 gap-6 sm:flex sm:flex-wrap">
      {STACK_LIST.map(({ title, icon, url }, key) => (
        <a key={key} href={`${url}?ref=${process.env.WEBSITE_URL}`} target="_blank" rel="noopener noreferrer">
          <div className="group flex h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg shadow-md transition duration-300 hover:-translate-y-1 hover:bg-sky-100 hover:shadow-lg sm:size-[108px]">
            <img src={icon.src} alt={title} className="aspect-square size-10 rounded border-none" />
            <div className="mt-3 text-sm text-gray-700 group-hover:text-gray-950">{title}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
