import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from './utils/supabase/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerSupabaseClient(request, response)

  await supabase.auth.getSession()

  return response
}
