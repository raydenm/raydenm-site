import { env } from '@/config/env'

export const sharedMetadata = {
  title: env.NEXT_PUBLIC_WEBSITE_USERNAME,
  description: `${env.NEXT_PUBLIC_WEBSITE_USERNAME}-个人网站`,
  url: env.NEXT_PUBLIC_WEBSITE_URL,
  keywords: [env.NEXT_PUBLIC_WEBSITE_USERNAME, '前端开发工程师', '博客', '个人网站']
}
