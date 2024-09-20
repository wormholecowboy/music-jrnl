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
      <div className="flex justify-center items-center">
        <div className="rounded-xl overflow-hidden mx-5">
          <Image src={avatarURL} width={50} height={50} />
        </div>
        <LogoutButton />
      </div>
    );
  }

  return <button onClick={handleLogin}>Login</button>;
}
