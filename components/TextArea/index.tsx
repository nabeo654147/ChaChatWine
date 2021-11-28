import React,{ forwardRef } from 'react';
import styled from 'styled-components';

type Props = {
   name?: string;
   placeholder?: string;
   textareaTitle?: string;
   rows?: number;
   cols?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>((
  props: Props, 
  ref
) => {
  return (
    <FormWrap>
      <p>{props.textareaTitle}</p>
        <textarea
          ref={ref}
          name={props.name}
          placeholder={props.placeholder}
          rows={props.rows}
          cols={props.cols}
        />
    </FormWrap>
  )
});

const FormWrap = styled.div`
  > textarea {
    font-size: 1rem;
    border-radius: 0.3rem;
  } 
`
