import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  type: string;
  placeholder: string;
  rangeTitle: string;
  step: number;
  min: number;
  max: number;
  value: number;
  initRange: boolean;
};

export const Range = forwardRef<HTMLInputElement, Partial<Props>>((props: Partial<Props>, ref) => {
  const [value, setValue] = useState<number | string>(3);

  useEffect(() => {
    if (props.initRange === false) setValue(3);
  }, [props.initRange]);

  return (
    <RangeWrap>
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
  );
});

const RangeWrap = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

const InputRange = styled.input`
  min-width: 200px;
`;
