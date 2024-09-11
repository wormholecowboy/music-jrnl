"use server";
import { createSupabaseServerClient } from "utils/supabase/server-client";

export default async function deletePhrase(phraseId) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const res = await supabase.from("phrases").delete().eq("phrase_id", phraseId);
}
