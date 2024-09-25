import Link from 'next/link'

import { NavigationLink } from '@/components/common/navigation-link'
import { LINKS, PROFILES } from '@/config/path'

export const MenuContent = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div className="flex w-full flex-col text-sm">
    <div className="flex flex-col gap-4">
      <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
        <img
          src="/assets/avatar.webp"
          alt={process.env.NEXT_PUBLIC_WEBSITE_USERNAME}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight">{process.env.NEXT_PUBLIC_WEBSITE_USERNAME}</span>
          <span className="text-muted-foreground">前端工程师</span>
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        {LINKS.map((link, linkIndex) => (
          <NavigationLink
            key={link.href}
            href={isMobile ? link.href : link.href + (link.defaultHref || '')}
            label={link.label}
            icon={link.icon}
            shortcutNumber={linkIndex + 1}
          />
        ))}
      </div>
    </div>
    <div className="my-6 h-px bg-border" />
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex flex-col gap-1">
        {PROFILES.map(({ url, title, icon }) => (
          <NavigationLink key={title} href={url} label={title} icon={icon} />
        ))}
      </div>
    </div>
  </div>
)
