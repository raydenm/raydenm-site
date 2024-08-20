import { useState, useEffect } from 'react'

import supabase from '@/services/supabase/public'
import { SUPABASE_TABLE_NAME } from '@/config'

export const useViewData = (slug?: string) => {
  const [viewData, setViewData] = useState<{ slug: string; view_count: number }[]>([])

  useEffect(() => {
    async function getViewData() {
      try {
        const supabaseQuery = supabase.from(SUPABASE_TABLE_NAME).select('slug, view_count')
        if (slug) supabaseQuery.eq('slug', slug)
        const { data: supabaseData } = await supabaseQuery
        if (supabaseData) setViewData(supabaseData)
      } catch (error) {
        console.info('Error fetching view data from Supabase:', error)
      }
    }

    getViewData()
  }, [slug])

  // useEffect(() => {
  //   function handleRealtimeChange(payload) {
  //     if (payload?.new?.slug) {
  //       setViewData((prev) => {
  //         if (!prev) return null
  //         const index = prev.findIndex((item) => item.slug === payload.new.slug)
  //         index !== -1 ? (prev[index] = payload.new) : prev.push(payload.new)
  //         return [...prev]
  //       })
  //     }
  //   }

  //   const channel = supabase
  //     .channel('supabase_realtime')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: 'UPDATE',
  //         schema: 'public',
  //         table: SUPABASE_TABLE_NAME,
  //         ...(slug && { filter: `slug=eq.${slug}` })
  //       },
  //       handleRealtimeChange
  //     )
  //     .subscribe()

  //   return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, [slug])

  return viewData
}
