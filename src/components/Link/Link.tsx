import styled from 'styled-components';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { timeAgo } from '@/utils/time-map';
import { trpc } from '@/utils/trpc';
export default function Link({ link }) {
  const utils = trpc.useContext();

  const time = timeAgo(link.createdAt);
  const deleteLink = trpc.deleteLink.useMutation({
    onSuccess: () => {
      utils.getAllLinks.refetch();
    },
  });

  const deleteLinkHandler = () => {
    const conf = confirm('Are you sure you want to delete this link?');
    if (conf === true) {
      console.log('Link deleted');
      deleteLink.mutate({ id: link.id });
    } else {
      return;
    }
  };

  return (
    <LinkWrapper>
      <div>
        <LinkTitle>
          <a href={link.url} target='_blank' rel='noreferrer'>
            {link.title}
          </a>
        </LinkTitle>
        <LinkDetails>
          <span>
            TYPE: <span>{link.type}</span>
          </span>
          <span>{time}</span>
        </LinkDetails>
      </div>
      <LinkActions>
        <LinkActionButton>
          <GrEdit />
        </LinkActionButton>
        <LinkActionButton onClick={deleteLinkHandler}>
          <GrTrash />
        </LinkActionButton>
      </LinkActions>
    </LinkWrapper>
  );
}
const LinkWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  margin-bottom: 20px;
  border-top: 1px solid #cccccc;
  &:first-of-type {
    border-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  /* &:hover {
    transform: translateX(5px);
    transition: transform 0.2s ease-in-out;
  } */
`;

const LinkTitle = styled.h1`
  margin-bottom: 5px;
  font-size: 18px;
  line-height: 1.8;
  margin: 0;
  text-decoration: none;
  a {
    color: #6176ff;
    text-decoration: none;
  }
`;

const LinkDetails = styled.div`
  font-style: italic;
  span {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }

    &:nth-child(2):before {
      content: '• ';
      margin-left: 5px;
    }
  }
`;

const LinkActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
const LinkActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transition: all 0.1s ease-out;
  }

  &:first-child {
    &:hover {
      background-color: #6176ff;
    }
  }
  &:last-child {
    &:hover {
      background-color: #ff6161;
    }
  }
`;
