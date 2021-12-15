import React, { VFC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { Button } from './atoms/Button';
import styled from 'styled-components';
import { sp } from '../lib/media';

type Props = {
  title: string;
  description: string;
  beforeSubMessage?: string;
  afterSubMessage?: string;
  children: React.ReactNode;
};

export const Layout: VFC<Props> = ({
  title,
  description,
  beforeSubMessage,
  afterSubMessage,
  children,
}) => {
  const pageTitel = title;
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    location.reload();
  };

  return (
    <Relative>
      <Head>
        <title>{pageTitel}</title>
        <meta name='description' content={description} />
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
          {currentUser && (
            <Button text={'ログアウト'} size={'large'} shape={'round'} onClick={handleLogout} />
          )}
        </HeaderNav>
      </header>
      <main>{children}</main>
      <footer>&copy; ChaChatWine</footer>
    </Relative>
  );
};

const HeaderNav = styled.nav`
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  button {
    background: #fba059;
    border: none;
  }
  a {
    font-size: 1.5rem;
  }
  ${sp`
    visibility: hidden;
  `}
`;

const SubTitle = styled.p`
  font-weight: bold;
  font-size: 1.8rem;
  font-family: serif;
  margin: auto;
  color: #ffbe92;
  ${sp`
    font-size: 1.3rem;
  `}
`;

const Relative = styled.div`
  position: relative;
  z-index: 1;
  h1 {
    font-size: 2.5rem;
    font-family: cursive;
    font-weight: bolder;
    text-shadow: 3px 3px 3px #e1cece;
  }
`;
