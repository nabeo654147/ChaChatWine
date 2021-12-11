import React, { VFC } from 'react';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar';

type ModalProps = {
  open: boolean;
  loading: boolean;
  photoURL: string;
  items: SuggestionData[] | null;
  handleClose?: () => void;
};

export type SuggestionData = {
  wine: string;
  description: string;
};

const SuggestionModal: VFC<ModalProps> = ({ open, loading, items, photoURL, handleClose }) => {
  return (
    <Overlay open={open}>
      <Modal>
        {loading === true ? (
          <h3>考え中...</h3>
        ) : (
          <>
            <h3>おすすめのワインはこちらです！</h3>
            {items &&
              items.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <Avatar src={photoURL} alt={'wineImage'} size={300} />
                    <p>{item.description}</p>
                  </React.Fragment>
                );
              })}
            <button onClick={handleClose}>閉じる</button>
            {/* <a
              // href={'https://www.aeondewine.com/shop/category/category.aspx?category=a106'}
              href={
                'https://www.amazon.co.jp/gp/browse.html?rw_useCurrentProtocol=1&node=71649051&ref_=amb_link_9Qx-yuTyRjmSCAxBbdHTRQ_62'
              }
              target='_blank'
            >
              ネットを見に行く
            </a> */}
          </>
        )}
      </Modal>
    </Overlay>
  );
};
export default SuggestionModal;

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3f3f3f7f;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.open === true ? 'unset' : 'hidden')};
`;

const Modal = styled.div`
  z-index: 5;
  width: 80%;
  padding: 1em;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
