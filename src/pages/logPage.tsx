import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import { Layout } from '../../components/layout';
import LogPageItems from '../../components/molecules/LogPageItems';
import styled from 'styled-components';

const logPage: NextPage = () => {
  return (
    <Layout title={'Log Page'} description={'記録ページ'} afterSubMessage={'の保管庫'}>
      <ImageBox>
        <LogPageItems />
        <Image src={'/img/logs.png'} width={800} height={800} />
      </ImageBox>
    </Layout>
  );
};

export default logPage;

const ImageBox = styled.div`
  /* > div {
    position: relative;
    z-index: 1;
  } */
  /* > img {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
  } */
`;
