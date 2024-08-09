import { Suspense } from 'react'
import { PlusIcon } from 'lucide-react'

import { ScrollArea } from '@/components/common/scroll-area'
import { JourneyCard } from '@/components/journey/journey-card'
import { FloatingHeader } from '@/components/common/floating-header'
import { ScreenLoadingSpinner } from '@/components/common/screen-loading-spinner'
import { PageTitle } from '@/components/layout/page-title'
import { GradientBg3 } from '@/components/common/gradient-bg'
import { getAllLogbook } from '@/lib/contentful'

async function fetchData() {
  const allLogbook = await getAllLogbook()

  const mappedLogbook: { year: number; logs: any[] }[] = []
  allLogbook.forEach((log) => {
    const year = new Date(log.date).getFullYear()
    const existingYear = mappedLogbook.find((item) => item?.year === year)
    if (!existingYear) mappedLogbook.push({ year, logs: [log] })
    else existingYear.logs.push(log)
  })

  return { allLogbook: mappedLogbook }
}

export default async function Journey() {
  const { allLogbook } = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="时光记录" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="时光记录" />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <div className="flex flex-col items-stretch gap-12">
              {allLogbook.map((item, itemIndex) => (
                <div key={`data_${itemIndex}`} className="flex flex-col items-baseline gap-6 md:flex-row md:gap-12">
                  <div className="flex items-center">
                    <h2>{item.year}</h2>
                    <hr className="my-0 ml-4 flex-1 border-dashed border-gray-200" />
                  </div>
                  <section>
                    {item.logs.map((log, logIndex) => (
                      <div key={`data_${itemIndex}_log_${logIndex}`} className="relative flex pb-8 last:pb-0">
                        {logIndex !== item.logs.length - 1 && (
                          <div className="absolute inset-0 flex w-6 items-center justify-center">
                            <div className="pointer-events-none h-full w-px border-l border-gray-200"></div>
                          </div>
                        )}
                        <div className="z-0 flex size-6 shrink-0 items-center justify-center rounded-full bg-black align-middle text-white">
                          <PlusIcon size={16} />
                        </div>
                        <div className="grow pl-8">
                          <JourneyCard {...log} index={logIndex} />
                        </div>
                      </div>
                    ))}
                  </section>
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
