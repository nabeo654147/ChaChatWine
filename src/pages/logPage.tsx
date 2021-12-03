import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../../components/layout';
import LogPageItems from '../../components/molecules/LogPageItems';

const logPage: NextPage = () => {
  return (
    <Layout title={'Log Page'} description={'記録ページ'} afterSubMessage={'の保管庫'}>
      <LogPageItems />
    </Layout>
  );
};

export default logPage;
