export const sendAnalytics = async (slug: string) => {
  const URL = process.env.WEBSITE_URL + '/api/increment-views'
  try {
    const res = await fetch(`${URL}?slug=${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(5000)
    })
    if (res.status !== 200) console.error('Failed to send analytics', res)
  } catch (error) {
    console.error('Error sending analytics', error)
  }
}
