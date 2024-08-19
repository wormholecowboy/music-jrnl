"use server";
import { createSupabaseServerClient } from "../../utils/supabase/server-client";

export default async function insertPhrases(phrase) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const userID = user?.id;
  const JSONPhrase = JSON.stringify(phrase.phrase);
  console.log("phrase id: ", phrase)

  const { data, error } = await supabase
    .from("phrases")
    .insert([
      {
        name: phrase.name,
        color: phrase.color,
        phrase: JSONPhrase,
        phrase_id: phrase.phrase_id,
        tonality: phrase.tonality,
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
