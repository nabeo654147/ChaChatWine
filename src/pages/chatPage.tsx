import React from 'react';
import styled from 'styled-components';
import Chatbot from '../../components/Chatbot';
import { Layout } from '../../components/layout';

const chatPage = () => {
  return (
    <Background>
      <Layout title={'Chat Page'} description={'チャットページ'} afterSubMessage={'のチャット部屋'}>
        <Chatbot />
      </Layout>
    </Background>
  );
};

export default chatPage;

const Background = styled.div`
  main {
    background: linear-gradient(320deg, #b0ff91, #f1fd4a);
  }
  header {
    background: #ccff55;
  }
`;
