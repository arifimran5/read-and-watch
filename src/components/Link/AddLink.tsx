import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { createLinkInput } from '@/types/link';
import { trpc } from '@/utils/trpc';

export default function AddLink({ folderId }) {
  const utils = trpc.useContext();
  const { register, handleSubmit, reset } = useForm<createLinkInput>();

  const { mutate: createFolder } = trpc.createLink.useMutation({
    onSuccess: () => {
      utils.getAllLinks.refetch();
    },
  });

  const onSubmit: SubmitHandler<createLinkInput> = (data) => {
    createFolder({
      title: data.title,
      url: data.url,
      folderId,
      type: data.type,
    });
    reset();
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <StyledFormInput
            type='text'
            placeholder='Title..'
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <StyledFormInput
            type='text'
            placeholder='URL..'
            {...register('url', { required: true })}
          />
        </div>
        <div>
          <StyledFormSelect {...register('type')} defaultValue='watch'>
            <option value='watch'>Watch</option>
            <option value='read'>Read</option>
          </StyledFormSelect>
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

  @media (max-width: 624px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StyledFormInput = styled.input`
  width: 100%;
  padding: 0.5em 0.4em;
  border: 2px solid #dadada;
  border-radius: 5px;
  background-color: transparent;
`;

const StyledFormSelect = styled.select`
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
