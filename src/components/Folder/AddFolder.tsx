import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { trpc } from '@/utils/trpc';

type createFolderInput = {
  title: string;
};

export default function AddFolder() {
  const utils = trpc.useContext();
  const { register, handleSubmit, reset } = useForm<createFolderInput>();

  const { mutate: createFolder } = trpc.createFolder.useMutation({
    onSuccess: () => {
      utils.getAllLinks.refetch();
    },
  });

  const onSubmit: SubmitHandler<createFolderInput> = (data) => {
    createFolder({ title: data.title });
    reset();
  };

  return (
    <>
      <h3>Create Folder to store links</h3>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <StyledFormInput
            type='text'
            placeholder='Title..'
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <StyleFormButton type='submit'>Add</StyleFormButton>
        </div>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const StyledFormInput = styled.input`
  width: 100%;
  padding: 0.5em 0.4em;
  border: 2px solid #dadada;
  border-radius: 5px;
  background-color: transparent;
`;
const StyleFormButton = styled.button`
  width: 100%;
  padding: 0.7em 2em;
  background-color: #6176ff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4860ff;
    transition: all 0.1s ease-out;
  }
`;
