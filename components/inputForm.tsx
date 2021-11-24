import React,{ forwardRef, MutableRefObject, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  //  ref?: React.ForwardedRef<HTMLInputElement>;
  //  ref?: MutableRefObject<HTMLInputElement | undefined>;
   name: string;
   type: string;
   placeholder: string;
   inputFormTitle: string;
};

export const InputForm = forwardRef<HTMLInputElement, Props>((
  props: Props, ref
) => {
  return (
    <FormWrap>
      <label htmlFor={props.type}>{props.inputFormTitle}</label>
      <InputFont
        ref={ref}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
    </FormWrap>
  )
});

const FormWrap = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
`

const InputFont = styled.input`
  font-size: 1.5rem;
`
