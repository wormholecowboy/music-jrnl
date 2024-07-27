"use client";

import { createSupabaseBrowserClient } from "/utils/supabase/browser-client";

export default function LoginButton(props) {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ""
        }`,
      },
    });
  };

  return <button onClick={handleLogin}>Login</button>;
}
