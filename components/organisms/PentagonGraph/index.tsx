import { VFC } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import styled from 'styled-components';

type Props = {
  data: {
    subject: string;
    value: number;
    fullMark: number;
  }[];
};

export const Pentagon: VFC<Props> = ({ data }) => {
  return (
    <Wrap>
      <RadarChart cx={175} cy={175} outerRadius={130} width={350} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis domain={[0, 5]} angle={18} />
        <Radar name='name' dataKey='value' stroke='#ff3333d3' fill='#d35b5b' fillOpacity={0.6} />
      </RadarChart>
    </Wrap>
  );
};

const Wrap = styled.div`
  overflow: unset;
  width: unset;
  height: unset;
  position: static;
`;
