import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  type: string;
  value?: string | number;
  min?: string;
  max?: string;
  list?: string;
  defaultValue?: string;
  autocompleate?: string;
  placeholder?: string;
  inputFormTitle: string;
  required?: boolean;
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
        list={props.list}
        autoComplete={props.autocompleate}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        required={props.required}
      />
    </FormWrap>
  );
});

const FormWrap = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  > input {
    border-radius: 8px;
    font-size: 1.5rem;
  }
`;
