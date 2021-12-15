import React, { VFC } from 'react';
import Chat from '../Chat';

type ChatsProps = {
  chats: {
    type: 'question' | 'answers';
    text: string;
  }[];
};

const Chats: VFC<ChatsProps> = ({ chats }) => {
  return (
    <li>
      {chats.map((chat, index) => {
        return <Chat text={chat.text} type={chat.type} key={index} />;
      })}
    </li>
  );
};

export default Chats;
