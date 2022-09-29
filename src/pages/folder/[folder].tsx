import AddLink from '@/components/Link/AddLink';
import LinksList from '@/components/Link/LinksList';
import { trpc } from '@/utils/trpc';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  // GetStaticPaths,
  // GetStaticProps,
  // GetStaticPropsContext,
  // InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { GrFormPreviousLink } from 'react-icons/gr';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header/Header';
import Head from 'next/head';
// import { appRouter } from '@/server/routers/app';
// import superjson from 'superjson';
// import { createProxySSGHelpers } from '@trpc/react/ssg';
// import { t } from '@/server/context';
// import { prisma } from '@/utils/prisma';

export default function FolderPage({ folderId }) {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });
  const { data: folderData } = trpc.getFolderById.useQuery(
    {
      id: folderId as string,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: 30000,
    }
  );

  return (
    <>
      <Head>
        <title>{folderData?.title} | Read&Watch</title>
        <meta
          name='description'
          content={`This is the folder pages that consists all links of ${folderData?.title}`}
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
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

// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext<{ folder: string }>
// ) => {
//   const ssg = await createProxySSGHelpers({
//     router: appRouter,
//     ctx: t._config.ctx,
//     transformer: superjson, // optional - adds superjson serialization
//   });

//   const folderId = context.params?.folder as string;

//   await ssg.getAllLinks.fetch({ id: folderId });

//   console.log('folderId', folderId);

//   // const folderId = await getFolderId(context);
//   return {
//     props: {
//       folderId,
//       trpcState: ssg.dehydrate(),
//     },
//     revalidate: 10,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const folders = await prisma?.folder.findMany({
//     select: {
//       id: true,
//     },
//   });

//   return {
//     paths: folders.map((fold) => ({
//       params: {
//         id: fold.id.toString(),
//       },
//     })),
//     fallback: 'blocking',
//   };
// };
