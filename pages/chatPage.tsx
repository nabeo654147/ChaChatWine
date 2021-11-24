import React from 'react';
import Chatbot from '../components/Chatbot';
import { Layout } from '../components/layout';

const chatPage = () => {
  return (
    <Layout
      title={'Chat Page'}
      description={'チャットページ'}
      afterSubMessage={'のチャット部屋'}
      >
      <Chatbot />
    </Layout>
  )
}

export default chatPage;
