import { GetServerSidePropsContext } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { GrGoogle } from 'react-icons/gr';
import { getServerAuthSession } from '@/utils/get-server-side-auth';
import { useRouter } from 'next/router';
import styled from 'styled-components';

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
      <LoginPageWrapper>
        <div className=''>
          <LoginTitle className=''>Welcome to Read And Watch</LoginTitle>
          <LoginDescription>
            Manage your watchlist and reading list in an organized manner
          </LoginDescription>
          <LoginButton className='' onClick={handleLogin}>
            <GrGoogle />
            Login with Google
          </LoginButton>
        </div>
      </LoginPageWrapper>
    </>
  );
}

const LoginPageWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
`;
const LoginDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

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
