import { VFC } from 'react';
import styled from 'styled-components';

type ListProps = {
  listTitle: string;
  handleSwitch: () => void;
};

export const Log: VFC<ListProps> = ({ listTitle, handleSwitch }) => {
  return <Li onClick={handleSwitch}>{listTitle}</Li>;
};

const Li = styled.li`
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
