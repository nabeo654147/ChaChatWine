import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/layout';
import { useAuth } from '../lib/AuthContext';

const Home: NextPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Layout 
        title={'ChaChatWine'}
        description={'ホームページ概要'}
        beforeSubMessage={'ようこそ！' }
      >
        <TitleBox>
          <AppTitle>ChaChatWine</AppTitle>
          <p>~あなたポッケに小さなソムリエ~</p>
        </TitleBox>

      <NavBox>
        <ul>
          <li><Link href='/chatPage'>おすすめのワインを聞く</Link></li>
          {
            currentUser 
            ? <li><Link href='/logPage'>記録ページ</Link></li>
            : <>
                <li><Link href='/signUpPage'>新規登録</Link></li>
                <li><Link href='/loginPage'>ログイン</Link></li>
              </>
          }
        </ul>
      </NavBox>

      </Layout>
    </>
  )
};

export default Home;

const NavBox = styled.nav`
  font-size: 2rem;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AppTitle = styled.p`
  font-size: 3.5rem;
  margin-bottom: 0;
`

const TitleBox = styled.div`
  font-size:  1.5rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`
