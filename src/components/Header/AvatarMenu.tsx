import styled, { keyframes } from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function AvatarMenu({ user }) {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.image as string}
            width={40}
            height={40}
            alt={user?.name as string}
          />
        </Avatar>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <StyledContent sideOffset={5}>
          <DropdownMenu.Arrow fill='#c5ffe6' />
          <StyledItem onSelect={() => signOut()}>Logout</StyledItem>
        </StyledContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const slideUpAndFade = keyframes`
  0% { opacity: 0; transform: translateY(2px) }
  100% { opacity: 1; transform: translateY(0px) }
`;

const slideRightAndFade = keyframes`
  0% { opacity: 0; transform: translateX(-2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const slideDownAndFade = keyframes`
  0% { opacity: 0; transform: translateY(-2px) }
  100% { opacity: 1; transform: translateY(0) }
`;

const slideLeftAndFade = keyframes`
  0% { opacity: 0; transform: translateX(2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const StyledContent = styled(DropdownMenu.Content)`
  min-width: 150px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
    &[data-state='open'] {
      &[data-side='top'] {
        animation-name: ${slideDownAndFade};
      }
      &[data-side='right'] {
        animation-name: ${slideLeftAndFade};
      }
      &[data-side='bottom'] {
        animation-name: ${slideUpAndFade};
      }
      &[data-side='left'] {
        animation-name: ${slideRightAndFade};
      }
    }
  }
`;

const StyledItem = styled(DropdownMenu.Item)`
  all: unset;
  line-height: 1;
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 1.2em;
  user-select: none;

  &[data-disabled] {
    color: #dbdbdb;
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: #f2f2f2;
  }
`;
