"use server";
import { createSupabaseServerClient } from "utils/supabase/server-client";

export default async function insertPhrases(phraseObj) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const userID = user?.id;
  const JSONPhrase = JSON.stringify(phraseObj.phrase);

  const { data, error } = await supabase
    .from("phrases")
    .insert([
      {
        name: phraseObj.name,
        color: phraseObj.color,
        phrase: JSONPhrase,
        phrase_id: phraseObj.phrase_id,
        tonality: phraseObj.tonality,
        user_id: userID,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    return error
  }

  if (data) {
    console.log({ data });
    return data
  }

}
