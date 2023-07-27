'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButton() {

    const supabase = createClientComponentClient()

    const handleSignOut = async () => {
        supabase.auth.signOut()
    }

    const handleSignIn = async () => {
        console.log('Sign in start')
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    return <>
        <button onClick={handleSignIn}>Login</button>
        <button onClick={handleSignOut}>Logout</button>
    </>
}