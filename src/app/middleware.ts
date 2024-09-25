import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
export function middleware(request: NextRequest, event: NextFetchEvent) {
  return NextResponse.next()
}

export const config = {}
