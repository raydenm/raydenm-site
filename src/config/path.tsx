import { SparklesIcon, PencilLineIcon, NavigationIcon, Wand2Icon, BookmarkIcon, Images } from 'lucide-react'

export const LINKS = [
  {
    href: '/',
    label: '主页',
    icon: <SparklesIcon size={16} />
  },
  {
    href: '/writing/atomic-design',
    label: '文章',
    icon: <PencilLineIcon size={16} />
  },
  {
    href: '/journey',
    label: '时光记录',
    icon: <NavigationIcon size={16} />
  },
  {
    href: '/stack',
    label: '技术栈',
    icon: <Wand2Icon size={16} />
  },
  {
    href: '/bookmarks/markbooks',
    label: '书签',
    icon: <BookmarkIcon size={16} />
  },
  {
    href: '/photo',
    label: '相册',
    icon: <Images size={16} />
  }
]

export const keyCodePathnameMapping: { [key: string]: string } = {
  Digit1: '/',
  Digit2: '/writing/atomic-design',
  Digit3: '/journey',
  Digit4: '/stack',
  Digit5: '/bookmarks/markbooks',
  Digit6: '/photo'
}
