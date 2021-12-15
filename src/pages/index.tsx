import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/layout';
import { useAuth } from '../../lib/AuthContext';
import { sp } from '../../lib/media';

const Home: NextPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Layout
        title={'ChaChatWine'}
        description={'ホームページ概要'}
        beforeSubMessage={'ようこそ！'}
      >
        <LeafIcon>
          <Image src='/img/leaf.png' height={80} width={300} />
        </LeafIcon>

        <TitleBox>
          <AppTitle>ChaChatWine</AppTitle>
          <p>~あなたポッケに小さなソムリエ~</p>
        </TitleBox>
        <NavBox>
          <ul>
            <li>
              <Link href='/chatPage'>🍇おすすめのワインを聞く</Link>
            </li>
            {currentUser ? (
              <>
                <li>
                  <Link href='/logFormPage'>🗒記録を書き込む</Link>
                </li>
                <li>
                  <Link href='/logPage'>📕記録セラー</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href='/signUpPage'>🖋新規登録</Link>
                </li>
                <li>
                  <Link href='/loginPage'>🚪ログイン</Link>
                </li>
              </>
            )}
          </ul>
        </NavBox>
        <WineImage>
          <Image src='/img/sommelier.png' height={250} width={200} />
          <Image src='/img/redwine.png' height={200} width={280} priority />
        </WineImage>
      </Layout>
    </>
  );
};

export default Home;

const NavBox = styled.nav`
  font-size: 2rem;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${sp` 
    font-size: 1.41rem;
  `}
`;

const AppTitle = styled.p`
  font-size: 3.5rem;
  margin-bottom: 0;
`;

const TitleBox = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  ${sp` 
    font-size: 1.25rem;
  `}
  p {
    text-shadow: 3px 3px 3px #ffe5d6;
  }
`;

const WineImage = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeafIcon = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  ${sp`
    top: 20px;
    width:230px;
  `}
`;
