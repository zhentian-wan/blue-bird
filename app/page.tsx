import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import AuthButtonServer from './auth-button.server';
import { redirect } from 'next/navigation';
import NewTweet from './new-tweet';


export default async function Home() {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data: {session}} = await supabase.auth.getSession()
  console.log('home session: ', session)
  if (!session) {
    // redirect('/login')
  }
  const {data: tweets} = await supabase.from("tweets").select("*, profiles(*)")

  return (
    <main >
      <AuthButtonServer />
      <NewTweet />
      <pre>
        {JSON.stringify(tweets, null, 2)}
      </pre>
    </main>
  )
}
