
const { createClient } = require('@supabase/supabase-js');

// Values from .env.local
const supabaseUrl = "https://uykyqoqhatlscpmzewpg.supabase.co";
// Using service role key to bypass RLS
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5a3lxb3FoYXRsc2NwbXpld3BnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk4MDY4OSwiZXhwIjoyMDc5NTU2Njg5fQ.JWGSl86UyP-52chGsoiv5bqNv5jmNg6BR8nOZ2OLn7o";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPart() {
    const { data, error } = await supabase
        .from('pc_parts')
        .select('*')
        .ilike('title', '%NZXT H9 Flow%');

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Parts found:", JSON.stringify(data, null, 2));
    }
}

checkPart();
