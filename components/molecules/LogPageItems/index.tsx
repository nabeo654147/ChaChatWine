import React, { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { LogList } from '../LogList';
import { Pentagon } from '../../organisms/PentagonGraph';
import { Button } from '../../atoms/Button';
import { tab } from '../../../lib/media';
import { useAuth } from '../../../lib/AuthContext';

export type LogItemProps = {
  uid: string;
  createAt: string;
  name: string;
  area: string;
  vintage: number;
  price: string;
  date: string;
  favorability: string;
  type: string;
  photoURL: string;
  aroma: number;
  sweetness: number;
  acidity: number;
  astringency: number;
  afterglow: number;
  comment: string;
};

const LogPageItems: VFC = () => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<LogItemProps[] | null>(null);
  const [initItems, setInitItems] = useState<LogItemProps[] | null>(null);

  const handleOpen = (id: string) => {
    if (items) {
      const filter = items.filter((item) => item.createAt === id);
      setItems(filter);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setItems(initItems);
    setOpen(false);
  };

  useEffect(() => {
    if (!currentUser) return;
    const getData = async () => {
      try {
        const q = query(
          collection(db, 'logData'),
          where('uid', '==', `${currentUser?.uid}`),
          orderBy('date', 'desc'),
          limit(10),
        );
        const snapShots = await getDocs(q);
        const logItems: LogItemProps[] = snapShots.docs.map((doc) => {
          console.log(doc.data());
          return doc.data() as LogItemProps;
        });
        return [setItems(logItems), setInitItems(logItems)];
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [currentUser]);

  return (
    <>
      {items && <LogList lists={items} handleOpen={handleOpen} />}
      <Overlay open={open}>
        <Modal>
          {items &&
            items.map((item) => {
              return (
                <React.Fragment key={item.createAt}>
                  <AvatarStyle>
                    {item.photoURL ? (
                      <Avatar src={item.photoURL} size={300} />
                    ) : (
                      <Avatar src={'/img/loading.jpeg'} size={300} />
                    )}
                  </AvatarStyle>
                  <p>{item.name}</p>
                  <Pentagon
                    data={[
                      { subject: '香り', value: item.aroma, fullMark: 5 },
                      { subject: '甘味', value: item.sweetness, fullMark: 5 },
                      { subject: '酸味', value: item.acidity, fullMark: 5 },
                      { subject: '渋味', value: item.astringency, fullMark: 5 },
                      { subject: '余韻', value: item.afterglow, fullMark: 5 },
                    ]}
                  />
                  <p>{item.type}ワイン</p>
                  <StarIcon>
                    {item.favorability === '1star' ? (
                      <span>★</span>
                    ) : item.favorability === '2star' ? (
                      <span>★★</span>
                    ) : item.favorability === '3star' ? (
                      <span>★★★</span>
                    ) : item.favorability === '4star' ? (
                      <span>★★★★</span>
                    ) : (
                      <span>★★★★★</span>
                    )}
                  </StarIcon>
                  <p>{item.area}</p>
                  <p>{item.vintage}年</p>
                  <p>¥{item.price}</p>
                  <p>{item.date}</p>
                  <Comment>{item.comment}</Comment>
                  <Button text={'閉じる'} size={'large'} shape={'round'} onClick={handleClose} />
                </React.Fragment>
              );
            })}
        </Modal>
      </Overlay>
    </>
  );
};

export default LogPageItems;

const Overlay = styled.div<{ open: boolean }>`
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background-color: #3f3f3f7f;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  visibility: ${(props) => (props.open === true ? 'unset' : 'hidden')};
`;

const Modal = styled.div`
  width: 90%;
  max-width: 900px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffe6a0;
  box-shadow: inset 0 0 30px #64625a;

  p {
    font-size: 1.3rem;
    color: #603913;
  }

  Button {
    border: none;
    background: #b9a878;
    margin-top: 1rem;
  }
`;

const StarIcon = styled.span`
  font-size: 2rem;
  color: #ffdc2f;
`;

const AvatarStyle = styled.div`
  img {
    position: unset !important;
    inset: unset !important;
    height: 18rem !important;
    width: 18rem !important;
    background: #fffef0;
  }
  span > img {
    margin-top: 5rem !important;
  }
`;

const Comment = styled.div`
  max-width: 650px;
  ${tab`
      max-width: 400px;
  `}
`;
