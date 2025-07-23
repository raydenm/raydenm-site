import {
  BookmarkIcon,
  ChartNoAxesCombined,
  GithubIcon,
  ImagePlus,
  Images,
  NavigationIcon,
  PencilLineIcon,
  SparklesIcon,
  Wand2Icon
} from 'lucide-react'

import { JunJingIcon, TwitterIcon } from '@/assets/svg'

export const LINKS = [
  {
    href: '/',
    label: '主页',
    icon: <SparklesIcon size={16} />
  },
  {
    href: '/writing',
    label: '文章',
    defaultHref: `/react-lifecycle`,
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
    label: '图库',
    icon: <Images size={16} />
  }
]

export const PROFILES = [
  {
    title: 'GitHub',
    url: 'https://github.com/raydenm',
    icon: <GithubIcon size={16} />
  },
  {
    title: 'Twitter',
    url: 'https://x.com/Raydenm928',
    icon: <TwitterIcon className="size-4" />
  },
  {
    url: 'https://img-storage.pages.dev',
    title: '图床',
    icon: <ImagePlus size={16} />
  },
  {
    title: '稀土掘金',
    url: 'https://juejin.cn/collection/6845242851597484040',
    icon: <JunJingIcon className="size-4" />
  },
  {
    url: 'https://us.umami.is/share/v7iBK1HqRbbkQ2y2',
    title: '网站统计',
    icon: <ChartNoAxesCombined size={16} />
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
