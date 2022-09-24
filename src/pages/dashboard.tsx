import { trpc } from '@/utils/trpc';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();

  const hello = trpc.protected_hello.useQuery();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  if (hello.isError) {
    alert(hello.error.message);
    router.push('/login');
    return;
  }

  if (hello.isLoading) {
    return <div>Loading...</div>;
  }

  console.log(session);
  return (
    <div>
      <h1>This is Dashboard</h1>
      <button onClick={() => signOut()}>Logout</button>
      <p>{hello.data?.message}</p>
    </div>
  );
}
