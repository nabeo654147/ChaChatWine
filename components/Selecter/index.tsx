import React,{ forwardRef } from 'react';
import styled from 'styled-components';

type Props = {
  name?: string;
  selecterTitle?: string;
  value?: string;
  optionItems: string[];
};

export const Selecter = forwardRef<HTMLSelectElement, Props>((
  props: Props,
  ref
) => {
  return (
    <SelecterWrap>
      <label>{props.selecterTitle}</label>
        <Select
          ref={ref}
          name={props.name}
        >
          {props.optionItems.map((item: string) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </Select>
    </SelecterWrap>
  )
});

const SelecterWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const Select = styled.select`
  font-size: 1.8rem;
`
