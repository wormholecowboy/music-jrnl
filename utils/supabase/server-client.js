import { cookies } from "next/headers";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { createServerClient } from "@supabase/ssr";

// server component can only get cookies and not set them, hence the "component" check
export function createSupabaseServerClient(component = false) {
  cookies().getAll();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return getCookie(name, { cookies });
        },
        set(name, value, options) {
          if (component) return;
          setCookie(name, value, { cookies, ...options });
        },
        remove(name, options) {
          if (component) return;
          deleteCookie(name, { cookies, ...options });
        },
      },
    }
  );
}

export function createSupabaseServerComponentClient() {
  cookies().getAll();
  return createSupabaseServerClient(true);
}

export function createSupabaseReqResClient(req, res) {
  cookies().getAll();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return getCookie(name, { req, res });
        },
        set(name, value, options) {
          setCookie(name, value, { req, res, ...options });
        },
        remove(name, options) {
          setCookie(name, "", { req, res, ...options });
        },
      },
    }
  );
}
