import type { NextPage } from 'next';
import React, { VFC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { getAuth } from '@firebase/auth';
import styled from 'styled-components';

type Props = {
  title?: string;
  description?: string;
  beforeSubMessage?: string;
  afterSubMessage?: string;
  children?: React.ReactNode;
};

export const Layout: VFC<Props> = ({
  title,
  description,
  beforeSubMessage,
  afterSubMessage,
  children,
}) => {
  const pageTitel = title || 'ホームページタイトル';
  const currentUser = getAuth().currentUser;
  const { logout } = useAuth();

  return (
    <>
      <Head>
        <title>{pageTitel}</title>
        <meta name='description' content={description || 'ホームページ概要'} />
      </Head>
      <header>
        <h1>{pageTitel}</h1>
        {currentUser && (
          <SubTitle>
            {beforeSubMessage}
            {currentUser?.displayName}
            {afterSubMessage}
          </SubTitle>
        )}
        <HeaderNav>
          <Link href='/'>Home</Link>
          <button onClick={logout}>ログアウト</button>
        </HeaderNav>
      </header>
      <main>{children}</main>
      <footer>&copy; ChaChatWine</footer>
    </>
  );
};

const HeaderNav = styled.nav`
  width: 20%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const SubTitle = styled.h3`
  color: #ffbe92;
`;
