"use client";

import { createSupabaseBrowserClient } from "/utils/supabase/browser-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
