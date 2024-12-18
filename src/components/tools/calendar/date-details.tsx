import { Lunar, Solar, SolarUtil, SolarWeek } from 'lunar-typescript'

export function DateDetails({ date }: { date: Date }) {
  const lunar = Lunar.fromDate(date)
  const solar = Solar.fromDate(date)
  const solarWeek = SolarWeek.fromDate(date, 1)
  const dayOfYear = SolarUtil.getDaysInYear(solar.getYear(), solar.getMonth(), solar.getDay())
  const festivals = [
    ...(lunar.getJieQi() ? [lunar.getJieQi()] : []),
    ...lunar.getFestivals(),
    ...lunar.getOtherFestivals(),
    ...solar.getFestivals(),
    ...solar.getOtherFestivals(),
    ...(lunar.getShuJiu() ? [lunar.getShuJiu()] : []),
    ...(lunar.getFu() ? [lunar.getFu()] : [])
  ]

  return (
    <div className="scrollbar-hide h-[560px] overflow-auto text-sm">
      {/* <div className="flex flex-row items-center gap-4">
        <div className="relative my-2 flex size-20 items-center justify-center rounded-xl bg-blue-500 pt-3 text-5xl font-semibold text-white">
          {solar.getDay()}
          <div className="absolute left-2 top-2 size-2 rounded-full bg-white"></div>
          <div className="absolute right-2 top-2 size-2 rounded-full bg-white"></div>
        </div>
        <div className='flex flex-col gap-1'>
          <div>
            {solar.toString()} 周{solar.getWeekInChinese()}
          </div>
          <div>
            {lunar.getYearInGanZhi()} ( {lunar.getYearShengXiao()} ) 年 {lunar.getMonthInChinese()}月
            {lunar.getDayInChinese()}
          </div>
          <div>
            本年第 {solarWeek.getIndexInYear()} 周 第 {dayOfYear} 天
          </div>
        </div>
      </div> */}
      <div className="flex flex-col items-center">
        <div>
          {solar.toString()} 周{solar.getWeekInChinese()}
        </div>
        <div className="relative my-2 flex size-20 items-center justify-center rounded-xl bg-blue-500 pt-3 text-5xl font-semibold text-white">
          {solar.getDay()}
          <div className="absolute left-2 top-2 size-2 rounded-full bg-white"></div>
          <div className="absolute right-2 top-2 size-2 rounded-full bg-white"></div>
        </div>
        {/* <div className='flex flex-col gap-1'> */}

        <div>
          {lunar.getYearInGanZhi()} ( {lunar.getYearShengXiao()} ) 年 {lunar.getMonthInChinese()}月
          {lunar.getDayInChinese()}
        </div>
        <div>
          本年第 {solarWeek.getIndexInYear()} 周 第 {dayOfYear} 天
        </div>
        {/* </div> */}
      </div>
      <div className="mt-3 flex flex-col leading-6 text-muted-foreground">
        <div className="flex items-start border-t border-muted py-2">
          <div className="mr-3 mt-[2px] shrink-0 rounded-[4px] bg-pink-300 px-[5px] py-0.5 text-xs text-white">
            星座
          </div>
          <div>{solar.getXingZuo()}座</div>
        </div>
        {festivals && festivals.length > 0 && (
          <div className="flex items-start border-t border-muted py-2">
            <div className="mr-3 mt-[2px] shrink-0 rounded-[4px] bg-blue-600 px-[5px] py-0.5 text-xs text-white">
              节日
            </div>
            <div>{festivals.join('，')}</div>
          </div>
        )}
        <div className="flex items-start border-t border-muted py-2">
          <div className="mr-3 mt-[2px] shrink-0 rounded-[4px] bg-green-600 px-[5px] py-0.5 text-xs text-white">宜</div>
          <div>{lunar.getDayYi().join('，')}</div>
        </div>
        <div className="flex items-start border-t border-muted py-2">
          <div className="mr-3 mt-[2px] shrink-0 rounded-[4px] bg-red-500 px-[5px] py-0.5 text-xs text-white">忌</div>
          <div>{lunar.getDayJi().join('，')}</div>
        </div>
        <div className="flex border-t border-muted py-2">
          <div className="flex w-1/2 items-start">
            <div className="mr-3 mt-[2px] shrink-0 rounded-[4px] bg-slate-600 px-[5px] py-0.5 text-xs text-white">
              月相
            </div>
            <div>{lunar.getYueXiang()}月</div>
          </div>
          <div className="flex w-1/2 items-start">
            <div className="mr-3 mt-[2px] shrink-0 rounded-[4px] bg-zinc-600 px-[5px] py-0.5 text-xs text-white">
              物候
            </div>
            <div>{lunar.getWuHou()}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-muted py-2">
          <div>喜神方位：{lunar.getDayPositionXiDesc()}</div>
          <div>阳贵神方位：{lunar.getDayPositionYangGuiDesc()}</div>
          <div>阴贵神方位：{lunar.getDayPositionYinGuiDesc()}</div>
          <div>福神方位：{lunar.getDayPositionFuDesc()}</div>
          <div>财神方位：{lunar.getDayPositionCaiDesc()}</div>
        </div>
      </div>
    </div>
  )
}
