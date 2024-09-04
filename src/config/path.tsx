import { SparklesIcon, PencilLineIcon, NavigationIcon, Wand2Icon, BookmarkIcon, Images } from 'lucide-react'

export const LINKS = [
  {
    href: '/',
    label: '主页',
    icon: <SparklesIcon size={16} />
  },
  {
    href: '/writing',
    label: '文章',
    defaultHref: `/react-hocs`,
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
    href: '/bookmarks',
    label: '书签',
    defaultHref: '/library',
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
  Digit2: '/writing',
  Digit3: '/journey',
  Digit4: '/stack',
  Digit5: '/bookmarks',
  Digit6: '/photo'
}
