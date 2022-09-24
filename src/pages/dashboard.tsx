import Header from '@/components/Header/Header';

import { trpc } from '@/utils/trpc';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  return (
    <>
      <Head>
        <title>Dashboard | Read&watch</title>
      </Head>

      <Header />
      <h1>This is Dashboard</h1>
    </>
  );
}
