import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../../components/layout';
import LogPageItems from '../../components/molecules/LogPageItems';
import styled from 'styled-components';
import { sp } from '../../lib/media';

const logPage: NextPage = () => {
  return (
    <Layout title={'Log Page'} description={'記録ページ'} afterSubMessage={'の保管庫'}>
      <LogBox>
        <LogPageItems />
      </LogBox>
    </Layout>
  );
};

export default logPage;

const LogBox = styled.div`
  width: 90%;
  max-width: 900px;
  min-height: 60vh;
  position: relative;
  margin: auto;
  padding: 2rem;
  background: #ffe6a0;
  box-shadow: inset 0 0 30px #64625a;
  ${sp`
    width: 95%;
  `}
  ul {
    max-width: 800px;
    margin: auto;
    padding: unset;
  }
`;
