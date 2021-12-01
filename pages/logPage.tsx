import React, { useRef, useState } from 'react';
import { Layout } from '../components/layout';
import { Input } from '../components/molecules/Input';
import { StarRating } from '../components/molecules/StarRating';
import { Textarea } from '../components/molecules/TextArea';
import { Range } from '../components/molecules/Range';
import { Uploader } from '../components/organisms/Uploader';
import { Selecter } from '../components/molecules/Selecter';
import { Button } from '../components/atoms/Button';
import { LogValuesProps, useWineLogs } from '../utils/hooks/useWineLogs';
import styled from 'styled-components';
import { setDoc, doc, Timestamp } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { getAuth } from '@firebase/auth';

const logPage = () => {
  const currentUser = getAuth().currentUser;
  const [favorite, setFavorite] = useState<string>('3star');

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
  const favorabilityRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(favorite);

    try {
      await setDoc(
        doc(db, 'logData', `${currentUser?.uid}`),
        {
          [`logValues(${Timestamp.now()})`]: {
            // timestamp: serverTimestamp()
            // recommendation: values.recommendation,
            name: nameRef.current?.value,
            area: areaRef.current?.value,
            vintage: vintageRef.current?.value,
            price: priceRef.current?.value,
            date: dateRef.current?.value,
            type: typeRef.current?.value,
            aroma: aromaRef.current?.value,
            sweetness: sweetnessRef.current?.value,
            acidity: acidityRef.current?.value,
            astringency: astringencyRef.current?.value,
            afterglow: afterglowRef.current?.value,
            favorability: favorite,
            comment: commentRef.current?.value,
          },
        },
        { merge: true },
      );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(e.target.value);
  };

  return (
    <Layout title={'Log Page'} description={'記録ページ'} afterSubMessage={'の記録ページ'}>
      <LogFrom>
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
            optionItems={[
              '赤',
              '白',
              'スパークリング',
              'ロゼ',
              'オレンジ',
              '甘口',
              '酒精強化ワイン',
            ]}
          />
          <UploaderBox>
            {/* <Uploader /> */}
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
          {/* <input type='submit' value='送信' /> */}
          <Button type={'submit'} text={'送信'} />
        </form>
      </LogFrom>
    </Layout>
  );
};

export default logPage;

const LogFrom = styled.div`
  border: 2px solid #ffa958;
  padding: 1rem;
  p,
  span,
  label {
    font-size: 1.6rem;
  }
  /* button {
    visibility: hidden;
  } */
`;

const UploaderBox = styled.div`
  display: flex;
  text-align: end;
  align-items: center;
`;
