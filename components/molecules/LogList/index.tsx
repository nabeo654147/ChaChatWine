import { useState, VFC } from 'react';
import { Log } from '../../atoms/Log';
import styled from 'styled-components';

type ListProps = {
  listTitle: string;
};

export const LogList: VFC<ListProps> = ({ listTitle }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Ul>
      {}
      <Log listTitle={listTitle}></Log>
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
`;
