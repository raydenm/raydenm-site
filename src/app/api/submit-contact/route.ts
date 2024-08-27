import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const resendEmail = process.env.RESEND_EMAIL || ''

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const { name, contact, message } = payload

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: resendEmail,
      subject: `website-submit-contact`,
      html: `<div>
        <p>姓名: ${name}</p>
        <p>联系方式: ${contact}</p>
        <p>留言: ${message}</p>
      </div>`
    })

    if (error) {
      console.error(error)
      return NextResponse.json({ error }, { status: 500 })
    }
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
