import { trpc } from '@/utils/trpc';
import Link from './Link';

export default function LinksList({ folderId }) {
  const { data, isLoading, isError } = trpc.getAllLinks.useQuery({
    id: folderId as string,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      {data?.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </>
  );
}
