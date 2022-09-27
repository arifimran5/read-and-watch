import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import AvatarMenu from './AvatarMenu';

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <HeaderWrapper>
      <nav>
        <h1>Read&Watch</h1>
      </nav>
      <div title={`Welcome, ${user?.name}`}>
        <AvatarMenu user={user} />
      </div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
