import React, { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { getAuth } from '@firebase/auth';
import { LogList } from '../LogList';

type ModalProps = {
  open?: boolean;
  handleClose?: () => void;
};

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
  const currentUser = getAuth().currentUser;
  const [switchBtn, setSwitchBtn] = useState<boolean>(false);
  const [items, setItems] = useState<LogItemProps[] | null>(null);
  const [initItems, setInitItems] = useState<LogItemProps[] | null>(null);

  const handleSwitch = () => {
    setItems(initItems);
    setSwitchBtn(!switchBtn);
  };

  const handleOpen = (id: string) => {
    if (items) {
      const filter = items.filter((item) => item.createAt === id);
      setItems(filter);
      setSwitchBtn(!switchBtn);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(
          collection(db, 'logData'),
          where('uid', '==', `${currentUser?.uid}`),
          orderBy('date', 'desc'),
          limit(10),
        );
        const snapShots = await getDocs(q);
        const logItems: LogItemProps[] = [];
        snapShots.forEach((doc) => {
          logItems.push(doc.data() as LogItemProps);
        });
        return [setItems(logItems), setInitItems(logItems)];
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {items && <LogList lists={items} handleOpen={handleOpen} />}
      {items &&
        items.map((item) => {
          return (
            <React.Fragment key={item.createAt}>
              <Overlay switchBtn={switchBtn} key={item.createAt}>
                <Modal>
                  <>
                    <Avatar src={item.photoURL} size={300} />
                    {/* <Pentagon
          data={[
            { subject: '香り', value: item.aroma, fullMark: 5 },
            { subject: '甘味', value: item.sweetness, fullMark: 5 },
            { subject: '酸味', value: item.acidity, fullMark: 5 },
            { subject: '渋味', value: item.astringency, fullMark: 5 },
            { subject: '余韻', value: item.afterglow, fullMark: 5 },
          ]}
          /> */}
                    <p>{item.name}</p>
                    <p>{item.area}</p>
                    <p>{item.vintage}年</p>
                    <p>¥{item.price}</p>
                    <p>{item.date}</p>
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
                    <p>{item.type}</p>
                    <p>{item.aroma}</p>
                    <div>{item.comment}</div>
                    <button onClick={handleSwitch}>閉じる</button>
                  </>
                </Modal>
              </Overlay>
            </React.Fragment>
          );
        })}
    </>
  );
};
export default LogPageItems;

const Overlay = styled.div<{ switchBtn: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3f3f3f7f;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.switchBtn === true ? 'unset' : 'hidden')};
`;

const Modal = styled.div`
  z-index: 2;
  width: 90%;
  padding: 1em;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StarIcon = styled.span`
  font-size: 2rem;
  color: #fdf900;
`;
