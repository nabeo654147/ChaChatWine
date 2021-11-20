import React, { VFC } from 'react';
import styled from 'styled-components';

type Props = {
    answer: {
        content: string,
        nextId: string
    },
    select: (selectAnswer:string, nextQuestionId: string) => void
}

const Answer: VFC<Props> = ({ answer, select}) => {

    return (
        <AnswerButton 
                onClick={() => select(answer.content, answer.nextId)}>
            {answer.content}
        </AnswerButton>
    );
};

export default Answer;

const AnswerButton = styled.button`
  width: 90%;
  background-color: #fa4545;
  margin-bottom: 0.2em;
  font-size: 1em;
  border-radius: 5px;

  :hover {
    opacity: 0.8;
  }
`
