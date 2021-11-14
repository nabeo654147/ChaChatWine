import type { NextPage } from 'next';
import { VFC } from 'react';
import  { Layout }  from '../components/layout';

const Home: VFC<NextPage> = () => {
  return (
    <>
      <Layout 
        title='Home'
        description='ホームページ概要'
      >
        <p>コンテンツ</p>
      </Layout>
    </>
  )
}

export default Home;
