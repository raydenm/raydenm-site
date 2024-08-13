import { cn } from '@/lib/utils'

export const LoadingSpinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black',
      className
    )}
    role="status"
    aria-label="loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
)
