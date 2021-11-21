import React, { VFC } from 'react';
import styled  from 'styled-components';
import Avatar from '../Avatar';

type ModalProps = {
  open: boolean,
  handleClose: () => void
}

const SuggestionModal: VFC<ModalProps> = ({ open, handleClose }) => {
  return (
    <Overlay open={open}>
      <Modal>
        <h3>おすすめのワインはこちらです！</h3>
        <Avatar src={'/img/corkboy.jpg'} size={300} />
        <p>サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト</p>
        <button onClick={handleClose}>閉じる</button>
      </Modal>
    </Overlay>
  )
}
export default SuggestionModal;

const Overlay = styled.div<{open:boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3f3f3f7f;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => props.open === true ? 'unset' : 'hidden'}
`;

const Modal = styled.div`
  z-index: 2;
  width: 80%;
  padding: 1em;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
