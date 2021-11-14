import React,{ VFC } from 'react';
import styled from 'styled-components';

type Props = {
   name: string;
   type: string;
   placeholder: string;
   inputFormTitle: string;
}

export const InputForm: VFC<Props> = ({
  name,
  type,
  placeholder,
  inputFormTitle,
}) => {
  return (
    <FormWrap>
      <label htmlFor={type}>{inputFormTitle}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </FormWrap>
  )
}

const FormWrap = styled.div`
  display: flex;
  /* justify-content: space-between; */
`
