import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bmVmcnhxZ2FtbWVta2xoaHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2Nzk0ODgsImV4cCI6MjA0NDI1NTQ4OH0.mC8GPKJSmlTywwh3ewebpq5bv4NZVbcZ-4VUPAEqZUU"
);
