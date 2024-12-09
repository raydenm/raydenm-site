import { useEffect, useState } from 'react'

import supabase from '@/services/supabase/public'

export const useViewData = (slug?: string) => {
  const [viewData, setViewData] = useState<{ slug: string; view_count: number }[]>([])

  useEffect(() => {
    async function getViewData() {
      try {
        const supabaseQuery = supabase.from('view_data').select('slug, view_count')
        if (slug) supabaseQuery.eq('slug', slug)
        const { data: supabaseData } = await supabaseQuery
        if (supabaseData) setViewData(supabaseData)
      } catch (error) {
        console.info('Error fetching view data from Supabase:', error)
      }
    }

    getViewData()
  }, [slug])

  return viewData
}
