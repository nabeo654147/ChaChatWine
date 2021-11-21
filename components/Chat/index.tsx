import React, { VFC } from 'react';
import Avatar from '../Avatar';
import styled, { css } from 'styled-components';

type ChatProps = {
    type: 'question' | 'answers',
    text: string,
}

const Chat: VFC<ChatProps> = ({ type, text }) => {
    const isQuestion: boolean = (type === 'question');

    return (
        <ChatRow type={type} text={text}>
            <div>
                {isQuestion ? (
                    <Avatar  src={'/img/corksan.jpeg'} size={50} />
                ) : (
                    <Avatar src={'/img/corkboy.jpg'} size={50}/>
                )}
            </div>
            <ChatBubble>{text}</ChatBubble>
        </ChatRow>
    );
};

export default Chat;

const ChatRow = styled.div<ChatProps>`
  display: flex;
  padding-right: 0 !important;

  ${props => {
    if(props.type === 'question') {
      return css` 
        flex-direction: row;
        justify-content: flex-start;
        `
    } else {
      return css `
        flex-direction: row-reverse;
        justify-content: end;
      `
    }
  }
}
`

const ChatBubble = styled.div`
  background: #41B6E6;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: .5rem;
  /* margin-right: 1rem; */
  margin: 0.2em 0;
  max-width: 80%;
  width: auto;
  
  /* position: relative;
  display: inline-block;
  margin: 1.5em 0 1.5em 15px;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #e0edff;

  &::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -30px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #e0edff;
} */
`

