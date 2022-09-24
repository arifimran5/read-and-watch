import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FolderPage() {
  const router = useRouter();
  const { folder } = router.query;
  return (
    <>
      <Link href='/dashboard'>Back to Dashboard</Link>
      <h1>This is single folder page</h1>
      <p> you are visiting :{folder}</p>
    </>
  );
}

export async function getStaticPaths() {}
