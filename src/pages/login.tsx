import { GetServerSidePropsContext } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { GrGoogle } from 'react-icons/gr';
import { getServerAuthSession } from '@/utils/get-server-side-auth';
import { useRouter } from 'next/router';

export default function LoginPage() {
  // const router = useRouter();
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push('/dashboard');
  //   },
  // });
  const handleLogin = () => {
    signIn('google');
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=''>
        <div className=''>
          <h1 className=''>Welcome to Read And Watch</h1>
          <p>Manage your watchlist and reading list in an organized manner</p>
          <button className='' onClick={handleLogin}>
            <GrGoogle />
            Login with Google
          </button>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res, req } = ctx;
  const session = await getServerAuthSession({ req, res });
  if (session?.user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
