import AddFolder from '@/components/Folder/AddFolder';
import FolderList from '@/components/Folder/FolderList';
import Header from '@/components/Header/Header';
import { trpc } from '@/utils/trpc';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

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

      <DashboardPageWrapper>
        <Header />
        <AddFolder />
        <FolderList />
      </DashboardPageWrapper>
    </>
  );
}

const DashboardPageWrapper = styled.main`
  max-width: 1140px;
  padding: 20px 15px;
  margin: auto;
`;
