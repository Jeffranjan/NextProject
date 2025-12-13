import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

let client: ReturnType<typeof createBrowserClient>

export function createClient() {
    if (typeof window === 'undefined') {
        // Server side: always return a new client
        return createBrowserClient(supabaseUrl, supabaseAnonKey)
    }

    if (!client) {
        // Client side: create a singleton
        client = createBrowserClient(supabaseUrl, supabaseAnonKey)
    }

    return client
}
