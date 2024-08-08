export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    host: process.env.WEBSITE_URL
  }
}
