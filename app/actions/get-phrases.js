'use server';
import { createSupabaseServerClient } from "../../utils/supabase/server-client";

export default async function getPhrases() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return
  const { data, error} = await supabase.from("phrases").select()
  return data
}
