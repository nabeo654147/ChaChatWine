import React, { forwardRef } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  type: string;
  value?: string | number;
  min?: string;
  max?: string;
  placeholder: string;
  inputFormTitle: string;
};

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  return (
    <FormWrap>
      <label htmlFor={props.type}>{props.inputFormTitle}</label>
      <input
        ref={ref}
        name={props.name}
        type={props.type}
        value={props.value}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
      />
    </FormWrap>
  );
});

const FormWrap = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  > input {
    border-radius: 0.3rem;
    font-size: 1.5rem;
  }
`;
