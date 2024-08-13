type phoneItem = {
  url: string
  id: string
  created_at: Date
  description: string
}
export const getPhotoList = async ({ pageSize = 20, pageIndex = 0 }: { pageSize?: number; pageIndex?: number }) => {
  const URL = process.env.NODE_ENV === 'production' ? `/api/photo-list` : 'http://localhost:3000/api/photo-list'

  const response = await fetch(`${URL}?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
    cache: 'no-store'
  })
  if (!response.ok) return null
  const data: { data: phoneItem[]; count: number } = await response.json()

  return data
}
