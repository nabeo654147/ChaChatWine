import React, { VFC } from 'react';
import styled from 'styled-components';
import Chat from '../Chat'

type ChatsProps = {
    chats: {
      type: 'question' | 'answers',
      text: string
    }[]
  }

const Chats: VFC<ChatsProps> = ({ chats }) => {

    return (
        <ChatList>
            {chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index} />
            })}
        </ChatList>
    );
};

export default Chats;

const ChatList = styled.li`
  list-style: none;
`
