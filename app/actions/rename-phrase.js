"use server";
import { createSupabaseServerClient } from "/utils/supabase/server-client";
// import { createSupabaseServerClient } from "../../utils/supabase/server-client";

export default async function RenamePhrase(phraseObj, newName) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("phrases")
    .update({ name: newName })
    .eq("phrase_id", phraseObj.phrase_id);

  if(error) console.log("Error renaming phrase.")
}

