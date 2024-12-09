import 'server-only'

import { z } from 'zod'

const isString = z.string().min(1)

const envSchema = z.object({
  // Contentful
  CONTENTFUL_SPACE_ID: isString,
  CONTENTFUL_ACCESS_TOKEN: isString,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: isString,
  CONTENTFUL_PREVIEW_SECRET: isString,

  // Supabase
  SUPABASE_URL: isString,
  SUPABASE_SERVICE_ROLE_KEY: isString,
  NEXT_PUBLIC_SUPABASE_URL: isString,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: isString,

  // Raindrop
  NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN: isString,

  // Resend
  RESEND_API_KEY: isString,
  RESEND_EMAIL: isString,

  // website url
  NEXT_PUBLIC_WEBSITE_URL: isString,
  NEXT_PUBLIC_WEBSITE_USERNAME: isString,

  // repo url
  NEXT_PUBLIC_REPO: isString,
  NEXT_PUBLIC_REPO_ID: isString,
  NEXT_PUBLIC_CATEGORY: isString,
  NEXT_PUBLIC_CATEGORY_ID: isString,

  // umami
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: isString
})

/**
 * Centralized environment variables for the application.
 */
export let env: z.infer<typeof envSchema>

try {
  const parsedEnv = envSchema.parse(process.env)
  env = {
    ...parsedEnv
  }
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten()
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) => (errors ? `${field}: ${errors.join(', ')}` : field))
      .join('\n  ')

    console.error(`Please check the environment variables\n\nMissing environment variables:\n  ${errorMessage}`)

    process.exit(1)
  }
}
