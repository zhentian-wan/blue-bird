import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import AuthButtonServer from './auth-button.server';
import { redirect } from 'next/navigation';


export default async function Home() {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data: {session}} = await supabase.auth.getSession()
  if (!session) {
    redirect('/login')
  }
  const {data: tweets} = await supabase.from("tweets").select()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      <pre>
        {JSON.stringify(tweets, null, 2)}
      </pre>
    </main>
  )
}
