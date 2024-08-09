import createSupabaseServerClient from "../../../utils/supabase/server-client";

export async function GET(req) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = supabase.auth.getUser();

  // const phrases = supabase.from("phrases").select();
  // console.log("supa res: ", phrases);

  return new Response({ "user": "thing"}, { status: 200 });
}
