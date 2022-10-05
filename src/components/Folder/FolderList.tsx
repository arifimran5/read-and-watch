import { timeAgo } from '@/utils/time-map';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GrEdit, GrTrash, GrSave } from 'react-icons/gr';
import styled from 'styled-components';

export default function FolderList() {
  const [edit, setEdit] = useState(false);
  const [currEdit, setCurrEdit] = useState('');
  const { register, handleSubmit } = useForm();

  const {
    data: folders,
    isLoading,
    refetch,
  } = trpc.getAllFolders.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

  const { mutate: updateFolder } = trpc.updateFolder.useMutation({
    onSuccess: () => {
      refetch();
      setEdit(false);
      setCurrEdit('');
    },
  });

  const deleteFolder = trpc.deleteFolder.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  if (isLoading) {
    return <div>loading...</div>;
  }

  const deleteLinkHandler = (id) => {
    const conf = confirm('Are you sure you want to delete this folder?');
    if (conf === true) {
      deleteFolder.mutate({ id });
    } else {
      return;
    }
  };

  const handleEdit = (id) => {
    setEdit(true);
    setCurrEdit(id);
  };
  const onSave = (data) => {
    setEdit(false);
    updateFolder({ id: currEdit, title: data.edit_title });
  };

  return (
    <section>
      {folders?.map((folder) => (
        <FolderWrapper key={folder.id}>
          <div>
            <FolderTitle>
              {folder.id === currEdit && edit ? (
                <input
                  type='text'
                  defaultValue={folder.title}
                  {...register('edit_title')}
                />
              ) : (
                <Link href={`/folder/${folder.id}`}>{folder.title}</Link>
              )}
            </FolderTitle>
            <FolderDetails>
              <span>{timeAgo(folder.createdAt)}</span>
            </FolderDetails>
          </div>

          <LinkActions>
            <LinkActionButton data-edit={edit && folder.id === currEdit}>
              {/* <GrEdit /> */}
              {edit && folder.id === currEdit ? (
                <GrSave onClick={handleSubmit(onSave)} />
              ) : (
                <GrEdit onClick={() => handleEdit(folder.id)} />
              )}
            </LinkActionButton>
            <LinkActionButton onClick={() => deleteLinkHandler(folder.id)}>
              <GrTrash />
            </LinkActionButton>
          </LinkActions>
        </FolderWrapper>
      ))}
    </section>
  );
}

const FolderWrapper = styled.article`
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

const FolderTitle = styled.h1`
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

const FolderDetails = styled.div`
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
    &[data-edit='true'] {
      background-color: #61ff6b;
    }

    &:hover {
      background-color: #6176ff;
    }
  }
  &:last-child {
    &:hover {
      background-color: #ff6161;
    }
  }

  svg {
    height: 45px;
  }
`;
