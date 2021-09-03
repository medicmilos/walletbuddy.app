import { createClient } from "@supabase/supabase-js"

const SUPABASE_KEY = process.env.VUE_APP_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.VUE_APP_SUPABASE_URL

export const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_KEY)
