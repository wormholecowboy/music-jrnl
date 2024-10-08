'use client'

import { redirect, useRouter } from 'next/navigation'
import  createSupabaseBrowserClient  from 'utils/supabase/browser-client'

export default function Login() {
  const router = useRouter()

  const handleLogin = async () => {
    const supabase = createSupabaseBrowserClient()
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      console.error('Error logging in:', error)
    } else {
      return redirect(data.url)
    }
  }

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  )
}
