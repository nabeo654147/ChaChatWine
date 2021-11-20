import type { NextPage } from 'next';
import React, { ReactNode, VFC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Layout:VFC = ({ title, children, description }: Props) => {
  const pageTitel = title || 'ホームページタイトル'
  return (
    <>
      <Head>
        <title>{ pageTitel }</title>
        <meta name='description' content={ description || 'ホームページ概要 ' } />
      </Head>
      <header>
        <h1>{ pageTitel }</h1>
      </header>
      <nav>
        <ul>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/loginPage'>Login</Link></li>
          <li><Link href='/signUpPage'>SignUp</Link> </li>
        </ul>
      </nav>
      <main>{ children }</main>
      <footer>&copy; Next.js Demo</footer>
    </>
  )
} 
