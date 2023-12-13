import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ruvbjnpswgeblgintkmg.supabase.co";

//The anon key in the api settings
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1dmJqbnBzd2dlYmxnaW50a21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNDIyMDIsImV4cCI6MjAxNjkxODIwMn0.Qiyhf7PrM08PQJN7rGg4UF8xqmHKF93fyBxdbtebEHs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
