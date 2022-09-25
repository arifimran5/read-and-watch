import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (router.isReady) {
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [router, router.isReady, session]);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Link href='/dashboard'>Go to Dashboard</Link>
    </div>
  );
};

export default Home;
