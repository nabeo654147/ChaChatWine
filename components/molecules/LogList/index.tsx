import { VFC } from 'react';
import { Log } from '../../atoms/Log';
import styled from 'styled-components';
import { LogItemProps } from '../LogPageItems';

type ListProps = {
  lists: LogItemProps[];
  handleSwitch: () => void;
};

export const LogList: VFC<ListProps> = ({ lists, handleSwitch }) => {
  return (
    <Ul>
      {lists.map((list) => {
        return <Log listTitle={list.date} key={list.createAt} handleSwitch={handleSwitch}></Log>;
      })}
    </Ul>
  );
};

const Ul = styled.ul`
  position: relative;
  list-style-type: none !important; /*ポチ消す*/
  padding: 0.5em 0.5em 0.5em 0.5em;
  margin-bottom: 5px;
  line-height: 1.5;
  background: #dbebf8;
  vertical-align: middle;
  color: #505050;
  border-radius: 15px 0px 0px 15px; /*左側の角丸く*/
  &:hover {
    cursor: pointer;
  }
`;
