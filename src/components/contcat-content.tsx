'use client'

import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/loading-spinner'

const SubmitContcatDialog = dynamic(
  () => import('@/components/submit-contcat/dialog').then((mod) => mod.SubmitContcatDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

const SubmitContcatDrawer = dynamic(
  () => import('@/components/submit-contcat/drawer').then((mod) => mod.SubmitContcatDrawer),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

export const ContcatContent = () => {
  return (
    <div className="mt-4">
      {/* <h2 className="mb-4 mt-8">联系我</h2>
      <div className="mb-4">如果您有任何问题、建议或合作意向，欢迎随时与我联系。</div> */}
      <div className="hidden lg:block">
        <SubmitContcatDialog />
      </div>
      <div className="lg:hidden">
        <SubmitContcatDrawer />
      </div>
    </div>
  )
}
