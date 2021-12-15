import React, { VFC } from 'react';
import styled from 'styled-components';

type Props = {
  answer: {
    content: string;
    nextId: string;
  };
  select: (selectAnswer: string, nextQuestionId: string) => void;
};

const Answer: VFC<Props> = ({ answer, select }) => {
  return (
    <AnswerButton onClick={() => select(answer.content, answer.nextId)}>
      {answer.content}
    </AnswerButton>
  );
};

export default Answer;

const AnswerButton = styled.button`
  width: 90%;
  color: #7e7e7e;
  background-color: #f0f150f2;
  margin-bottom: 0.2em;
  font-size: 1.2em;
  font-weight: bolder;
  border-radius: 10px;

  :hover {
    background-color: #f2ff38;
  }
`;
