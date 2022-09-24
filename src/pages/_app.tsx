import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <div className='px-4'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);
