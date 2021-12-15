import React, { VFC } from 'react';
import Avatar from '../../atoms/Avatar';
import styled, { css } from 'styled-components';

type ChatProps = {
  type: 'question' | 'answers';
  text: string;
};

const Chat: VFC<ChatProps> = ({ type, text }) => {
  const isQuestion: boolean = type === 'question';

  return (
    <ChatRow type={type}>
      <div>
        {isQuestion ? (
          <Avatar src={'/img/corksan.jpeg'} size={50} />
        ) : (
          <Avatar src={'/img/corkboy.jpg'} size={50} />
        )}
      </div>
      <ChatBubble>{text}</ChatBubble>
    </ChatRow>
  );
};

export default Chat;

const ChatRow = styled.div<{ type: 'question' | 'answers' }>`
  display: flex;
  padding-right: 0 !important;

  ${(props) => {
    if (props.type === 'question') {
      return css`
        flex-direction: row;
        justify-content: flex-start;
      `;
    } else {
      return css`
        flex-direction: row-reverse;
        justify-content: end;
      `;
    }
  }}
`;

const ChatBubble = styled.div`
  background: #f2ffebed;
  border-radius: 8px;
  color: #007e67;
  font-weight: bolder;
  padding: 0.5rem;
  margin: 0.2em 0;
  max-width: 80%;
`;
