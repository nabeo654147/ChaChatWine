import { VFC } from 'react';
import { Log } from '../../atoms/Log';
import styled from 'styled-components';
import { LogItemProps } from '../LogPageItems';

type ListProps = {
  lists: LogItemProps[];
  handleOpen: (id: string) => void;
};

export const LogList: VFC<ListProps> = ({ lists, handleOpen }) => {
  return (
    <Ul>
      {lists.map((list) => {
        return (
          <Log
            listTitle={`${list.name} / ${list.date}`}
            key={list.createAt}
            list={list}
            handleSwitch={handleOpen}
          ></Log>
        );
      })}
    </Ul>
  );
};

const Ul = styled.ul`
  &:hover {
    cursor: pointer;
  }
  li {
    position: relative;
    padding: 0.5em 0.5em 0.5em 0.5em;
    line-height: 1.5;
    background: #dbebf8;
    color: #505050;
    border-radius: 15px 0px 0px 15px; /*左側の角丸く*/
    /* margin-bottom: 1rem; */
  }
`;
