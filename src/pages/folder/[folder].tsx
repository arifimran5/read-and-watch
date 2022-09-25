import AddLink from '@/components/Link/AddLink';
import LinksList from '@/components/Link/LinksList';
import { trpc } from '@/utils/trpc';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { GrFormPreviousLink } from 'react-icons/gr';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header/Header';

export default function FolderPage({ folderId }) {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });
  const { data: folderData } = trpc.getFolderById.useQuery({
    id: folderId as string,
  });

  return (
    <>
      <FolderPageWrapper>
        <Header />
        <Link href='/dashboard'>
          <StyledBackLink>
            <GrFormPreviousLink />
            Back to Dashboard
          </StyledBackLink>
        </Link>

        <h1>{folderData?.title}</h1>
        <AddLink folderId={folderId} />
        <LinksList folderId={folderId} />
      </FolderPageWrapper>
    </>
  );
}

const FolderPageWrapper = styled.main`
  max-width: 1140px;
  padding: 20px 15px;
  margin: auto;
`;

const StyledBackLink = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 1em;
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 1.2rem;
  }
`;

async function getFolderId(context) {
  const folderId = context.params?.folder;

  if (!folderId) {
    return null;
  }

  return folderId;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const folderId = await getFolderId(context);
  return {
    props: {
      folderId,
    },
  };
};
