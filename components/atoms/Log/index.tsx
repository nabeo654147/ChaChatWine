import { VFC } from 'react';
import styled from 'styled-components';
import { LogItemProps } from '../../molecules/LogPageItems';

type ListProps = {
  list: LogItemProps;
  listTitle: string;
  handleSwitch: (id: string) => void;
};

export const Log: VFC<ListProps> = ({ listTitle, list, handleSwitch }) => {
  return <Li onClick={() => handleSwitch(list.createAt)}>{listTitle}</Li>;
};

const Li = styled.li`
  margin-bottom: 0.5rem;

  &:before {
    display: inline-block;
    vertical-align: middle;
    /*以下白丸つくる*/
    content: '';
    width: 1em;
    height: 1em;
    background: #fff;
    border-radius: 50%;
    margin-right: 8px;
  }
`;
