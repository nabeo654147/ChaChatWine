import React, { useEffect, useRef, useState, VFC } from 'react';
import { Input } from '../../../components/molecules/Input';
import { StarRating } from '../../../components/molecules/StarRating';
import { Textarea } from '../../../components/molecules/TextArea';
import { Range } from '../../../components/molecules/Range';
import { Uploader } from '../../../components/organisms/Uploader';
import { Selecter } from '../../../components/molecules/Selecter';
import { Button } from '../../../components/atoms/Button';
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  TaskState,
  StorageError,
} from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { minitab } from '../../../lib/media';
import styled from 'styled-components';
import { useAuth } from '../../../lib/AuthContext';

type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: TaskState;
};

const LogForm: VFC = () => {
  const { currentUser } = useAuth();
  const [favorite, setFavorite] = useState<string>('3star');
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const vintageRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const aromaRef = useRef<HTMLInputElement>(null);
  const sweetnessRef = useRef<HTMLInputElement>(null);
  const acidityRef = useRef<HTMLInputElement>(null);
  const astringencyRef = useRef<HTMLInputElement>(null);
  const afterglowRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const logFormItems = {
      uid: currentUser?.uid,
      createAt: Timestamp.now().toDate(),
      name: nameRef.current?.value,
      area: areaRef.current?.value,
      vintage: Number(vintageRef.current?.value),
      price: Number(priceRef.current?.value),
      date: dateRef.current?.value,
      favorability: favorite,
      type: typeRef.current?.value,
      photoURL: photoURL,
      aroma: Number(aromaRef.current?.value),
      sweetness: Number(sweetnessRef.current?.value),
      acidity: Number(acidityRef.current?.value),
      astringency: Number(astringencyRef.current?.value),
      afterglow: Number(afterglowRef.current?.value),
      comment: commentRef.current?.value,
    };

    if (myFiles[0] === undefined) {
      try {
        addDoc(collection(db, 'logData'), { ...logFormItems });
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    } else {
      try {
        const storageRef = ref(storage, `images/logs/${currentUser?.uid}/${myFiles[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, myFiles[0]);

        uploadTask.on(
          'state_changed',
          (snapshot: firebaseOnLoadProp) => {
            const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error: StorageError) => {
            //失敗した場合
            switch (error.code) {
              case 'storage/unauthorized':
                console.error('権限がありません');
                break;
              case 'storage/canceled':
                console.error('アップロードがキャンセルされました');
                break;
              case 'storage/unknown':
                console.error('予期せぬエラーが発生しました');
                break;
            }
          },
          () => {
            //成功した時
            try {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
                try {
                  setPhotoURL(downloadUrl);
                  addDoc(collection(db, 'logData'), { ...logFormItems });
                } catch (error) {
                  console.log(error);
                  return Promise.reject(error);
                }
                console.log(`ダウンロードしたURL ${downloadUrl}`);
              });
            } catch (error: any) {
              switch (error.code) {
                case 'storage/object-not-found':
                  console.log('ファイルが存在しませんでした');
                  break;
                case 'storage/unauthorized':
                  console.log('権限がありません');
                  break;
                case 'storage/canceled':
                  console.log('キャンセルされました');
                  break;
                case 'storage/unknown':
                  console.log('予期せぬエラーが生じました');
                  break;
              }
            }
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(e.target.value);
  };

  useEffect(() => {
    const getToday = () => {
      const day = new Date();
      let yyyy = day.getFullYear();
      let mm = `0${day.getMonth() + 1}`.slice(-2);
      let dd = `0${day.getDate()}`.slice(-2);
      if (dateRef.current) dateRef.current.value = `${yyyy}-${mm}-${dd}`;
    };
    getToday();
  }, []);

  return (
    <LogBox>
      <form onSubmit={handleSubmit}>
        <Input
          ref={nameRef}
          name={'wineName'}
          type={'text'}
          placeholder={'ちゃちゃっとワイン'}
          inputFormTitle={'ワイン名'}
          required={true}
        />
        <Input
          ref={areaRef}
          name={'area'}
          type={'text'}
          placeholder={'コルク王国/ミュズレ地方'}
          inputFormTitle={'原産国/産地名'}
        />
        <Input
          ref={vintageRef}
          name={'vintage'}
          type={'number'}
          min={'1900'}
          max={'2030'}
          placeholder={'1995'}
          list={'vintage'}
          inputFormTitle={'ヴィンテージ(収穫年)'}
        />
        <datalist id='vintage'>
          <option value='2000' />
        </datalist>
        <Input
          ref={priceRef}
          name={'price'}
          type={'number'}
          min={'0'}
          placeholder={'10000'}
          inputFormTitle={'価格'}
        />
        <Input ref={dateRef} name={'date'} type={'date'} inputFormTitle={'日付'} />
        <StarRating
          favorite={favorite}
          onChange={handleChange}
          ratingTitle={'お気に入り度 : '}
          starIds={['5star', '4star', '3star', '2star', '1star']}
        />
        <Selecter
          ref={typeRef}
          selecterTitle={'種類 : '}
          optionItems={['赤', '白', 'スパークリング', 'ロゼ', 'オレンジ', '甘口', '酒精強化ワイン']}
        />
        <UploaderBox>
          <Uploader src={src} myFiles={myFiles} setSrc={setSrc} setMyFiles={setMyFiles} />
          <div>
            <Range ref={aromaRef} rangeTitle={'香り'} step={1} min={1} max={5} />
            <Range ref={sweetnessRef} rangeTitle={'甘味'} step={1} min={1} max={5} />
            <Range ref={acidityRef} rangeTitle={'酸味'} step={1} min={1} max={5} />
            <Range ref={astringencyRef} rangeTitle={'渋味'} step={1} min={1} max={5} />
            <Range ref={afterglowRef} rangeTitle={'余韻'} step={1} min={1} max={5} />
          </div>
        </UploaderBox>
        <Textarea
          ref={commentRef}
          rows={5}
          cols={50}
          textareaTitle={'感じたこと'}
          placeholder={
            '今日は、コルク坊やと話をしている中で飲んでみたいワインが出てきたので、そのワインを飲んでみることに！' +
            `\nとても香りの良いワインで、マスカットのようの香りがした。\nこの香りのシャンプーがあったら10個はストックするだろう！\n今度は同じ地域の違う品種のワインを飲んでみたい！！`
          }
        />
        <ButtonPosition>
          <Button size={'large'} shape={'round'} type={'submit'} text={'送信'} />
        </ButtonPosition>
      </form>
    </LogBox>
  );
};

export default LogForm;

const LogBox = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 3rem;
  background: #ffe291;
  box-shadow: inset 0 0 30px #64625a;
  Input {
    background: #feffec;
  }
  p,
  span,
  label {
    font-size: 1.6rem;
  }
  div {
    margin-bottom: 0.8rem;
  }
  Button {
    border: none;
  }
`;

const UploaderBox = styled.div`
  > div {
    min-height: 20rem;
    min-width: 17rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${minitab`
          flex-direction: column;
  `}
`;

const ButtonPosition = styled.div`
  display: flex;
  justify-content: center;
`;
