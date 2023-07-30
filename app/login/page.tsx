import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonClient from "../auth-button.client";

export default async function Login() {
    const supabase = createServerComponentClient<Database>({cookies})
    const {data: {session}} = await supabase.auth.getSession()
    console.log('lgoin session: ', session)
    if (session) {
        redirect('/')
    }

    return <AuthButtonClient session={session}/>
}