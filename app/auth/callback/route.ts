
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    // Handle error params from Supabase (e.g. invalid link, expired, etc)
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')
    if (error) {
        return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error_description || error)}`)
    }

    if (code) {
        const supabase = await createClient()
        const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
        if (!sessionError) {
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        } else {
            // If code exchange fails
            return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(sessionError.message)}`)
        }
    }

    // return the user to an error page with instructions if no code and no error param
    return NextResponse.redirect(`${origin}/auth?error=Authentication failed`)
}
