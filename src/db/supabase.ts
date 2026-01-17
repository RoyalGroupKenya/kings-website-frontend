import { createClient } from '@supabase/supabase-js'
import { unstable_noStore as noStore } from "next/cache";

const supabaseUrl = 'https://exdefxyldgjlcpjkpuor.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGVmeHlsZGdqbGNwamtwdW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzY3NTAsImV4cCI6MjAzNzIxMjc1MH0.0QOOrbyPdGemXYpv3dMMvsPD9QhJG-ig_FMhRrdJumk"
//noStore();
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
     autoRefreshToken: false,
     persistSession: false,
  },
})

export default supabase