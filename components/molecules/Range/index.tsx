import React,{ forwardRef, useState } from 'react';
import styled from 'styled-components';

type Props = {
   name: string;
   type?: string;
   placeholder?: string;
   rangeTitle?: string;
   step?: number;
   min?: number;
   max?: number;
   value?: number;
};

export const Range = forwardRef<HTMLInputElement, Props>((
  props: Props, 
  ref
) => {
  const [value, setValue] = useState<number | string>(3);

  return (
    <RangeWrap >
      <label>{props.rangeTitle}</label>
      <div>
        <InputRange
          ref={ref}
          type={'range'}
          name={props.name}
          step={props.step}
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={(e) => setValue(e.target.value)}
        />
      <span>{value}</span>
      </div>
    </RangeWrap>
  )
});

const RangeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    /* width: 20rem; */
    /* width: 100%; */
    /* align-items: end; */
  }
`

const InputRange = styled.input`
  /* width: 50%; */
  width: 200px;
`
