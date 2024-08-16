export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    host: process.env.NEXT_PUBLIC_WEBSITE_URL
  }
}
