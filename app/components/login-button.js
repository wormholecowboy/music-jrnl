"use client";

import Image from "next/image";
import createSupabaseBrowserClient from "/utils/supabase/browser-client";
import useSession from "/utils/supabase/use-session";
import LogoutButton from "./logout-button";

export default function LoginButton(props) {
  const supabase = createSupabaseBrowserClient();
  const session = useSession();

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

  if (session) {
    const avatarURL = session.user.user_metadata.avatar_url;
    return (
      <>
        <Image src={avatarURL} width={50} height={50} />
        <LogoutButton />
      </>
    );
  }

  return <button onClick={handleLogin}>Login</button>;
}
