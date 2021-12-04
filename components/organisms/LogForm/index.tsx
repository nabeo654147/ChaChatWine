import React, { useRef, useState, VFC } from 'react';
import { Input } from '../../../components/molecules/Input';
import { StarRating } from '../../../components/molecules/StarRating';
import { Textarea } from '../../../components/molecules/TextArea';
import { Range } from '../../../components/molecules/Range';
import { Uploader } from '../../../components/organisms/Uploader';
import { Selecter } from '../../../components/molecules/Selecter';
import { Button } from '../../../components/atoms/Button';
import styled from 'styled-components';
import { addDoc, collection, doc, Timestamp } from '@firebase/firestore';
import { db, storage } from '../../../lib/firebase';
import { getAuth } from '@firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, TaskState } from 'firebase/storage';

type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: TaskState;
};

const LogForm: VFC = () => {
  const currentUser = getAuth().currentUser;
  const [favorite, setFavorite] = useState<string>('3star');
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState<string>('');

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(
        collection(db, 'logData'),
        {
          // recommendation: values.recommendation,
          uid: currentUser?.uid,
          createAt: Timestamp.now().toDate(),
          name: nameRef.current?.value,
          area: areaRef.current?.value,
          vintage: Number(vintageRef.current?.value),
          price: Number(priceRef.current?.value),
          date: dateRef.current?.value,
          favorability: favorite,
          type: typeRef.current?.value,
          photoURL: src,
          aroma: Number(aromaRef.current?.value),
          sweetness: Number(sweetnessRef.current?.value),
          acidity: Number(acidityRef.current?.value),
          astringency: Number(astringencyRef.current?.value),
          afterglow: Number(afterglowRef.current?.value),
          comment: commentRef.current?.value,
        },
        // { merge: true },
      );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }

    try {
      const storageRef = ref(storage, `imgaes/logs/${currentUser?.uid}/${myFiles[0].name}`);
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
        (error: any) => {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(e.target.value);
  };

  return (
    <LogBox>
      <form onSubmit={handleSubmit}>
        <Input
          ref={nameRef}
          name={'name'}
          type={'text'}
          placeholder={'ワイン名'}
          inputFormTitle={'ワイン名'}
        />
        <Input
          ref={areaRef}
          name={'area'}
          type={'text'}
          placeholder={'原産国/産地'}
          inputFormTitle={'原産国/産地名'}
        />
        <Input
          ref={vintageRef}
          name={'vintage'}
          type={'number'}
          min={'1900'}
          max={'2030'}
          placeholder={'ヴィンテージ'}
          inputFormTitle={'ヴィンテージ'}
        />
        <Input
          ref={priceRef}
          name={'price'}
          type={'number'}
          placeholder={'価格'}
          inputFormTitle={'価格'}
        />
        <Input
          ref={dateRef}
          name={'date'}
          type={'date'}
          placeholder={'日付'}
          inputFormTitle={'日付'}
        />
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
          textareaTitle={'コメント欄'}
          placeholder={'コメント欄'}
          rows={5}
          cols={50}
        />
        <Button type={'submit'} text={'送信'} />
      </form>
    </LogBox>
  );
};

export default LogForm;

const LogBox = styled.div`
  border: 2px solid #ffa958;
  padding: 1rem;
  p,
  span,
  label {
    font-size: 1.6rem;
  }
`;

const UploaderBox = styled.div`
  display: flex;
  text-align: end;
  align-items: center;
`;
