import { redirect } from 'next/navigation'

import { createSupabaseServerComponentClient } from '../../utils/supabase/server-client'

export default async function PrivatePage() {
  const supabase = createSupabaseServerComponentClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}
