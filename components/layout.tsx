import React, { VFC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { Button } from './atoms/Button';
import styled from 'styled-components';
import { sp } from '../lib/media';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

type Props = {
  title: string;
  description: string;
  logoutButton?: boolean;
  beforeSubMessage?: string;
  afterSubMessage?: string;
  children: React.ReactNode;
};

export const Layout: VFC<Props> = ({
  title,
  description,
  logoutButton = false,
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
          <Button
            shape={'iconCircle'}
            icon={
              <Link href='/'>
                <HomeRoundedIcon />
              </Link>
            }
          />

          {currentUser && logoutButton === true && (
            <Button shape={'iconCircle'} icon={<LogoutIcon />} onClick={handleLogout} />

            // <Button text={'ログアウト'} size={'large'} shape={'round'} onClick={handleLogout} />
          )}
        </HeaderNav>
      </header>
      <main>{children}</main>
      <footer>&copy; ChaChatWine</footer>
    </Relative>
  );
};

const HeaderNav = styled.nav`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 0.2rem;
  button {
    height: 3rem;
    width: 3rem;
    margin: 0 0.5rem;
    background: #fba059;
    ${sp`
      margin: 0 0.2rem;
  `}
  }
  a {
    font-size: 1.5rem;
  }
  ${sp`
    font-size: 1rem;
  `}
  svg {
    font-size: 2rem;
    color: #ffffff;
  }
`;

const SubTitle = styled.p`
  font-weight: bold;
  font-size: 1.8rem;
  font-family: serif;
  padding: 0 2rem;
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
