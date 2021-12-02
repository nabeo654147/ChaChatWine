import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../../components/layout';
import LogForm from '../../components/organisms/LogForm';

const logPage: NextPage = () => {
  return (
    <Layout title={'Log Page'} description={'記録ページ'} afterSubMessage={'の記録ページ'}>
      <LogForm />
    </Layout>
  );
};

export default logPage;
