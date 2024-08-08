export const sendAnalytics = async (slug: string) => {
  // const URL =
  //   process.env.NODE_ENV === 'production'
  //     ? process.env.WEBSITE_URL + '/api/increment-views'
  //     : 'http://localhost:3000/api/increment-views'
  const URL = 'https://raydenm.zeabur.app/api/increment-views'
  // console.log(URL);

  try {
    console.log('Sending analytics', URL, slug)
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
