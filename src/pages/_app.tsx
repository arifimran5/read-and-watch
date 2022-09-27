// import type { AppProps } from 'next/app';
// import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import GlobalCss from '@/styles/global.css';
import styled from 'styled-components';

const AppWrapper = styled.main`
  margin-inline: 1em;

  @media (max-width: 600px) {
    padding-inline: 0.4em;
  }
`;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <SessionProvider session={session}>
        <GlobalCss />
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </SessionProvider>
    </>
  );
};
export default trpc.withTRPC(MyApp);
