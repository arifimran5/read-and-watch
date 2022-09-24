import '../styles/global.css.ts';
import type { AppProps } from 'next/app';
// import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import GlobalCss from '@/styles/global.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <GlobalCss />
      <Component {...pageProps} />
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);
