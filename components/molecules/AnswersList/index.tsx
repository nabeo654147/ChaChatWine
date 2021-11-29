import React, { VFC } from 'react';
import styled from 'styled-components';
import Answer from '../../atoms/Answer'

type Props = {
    answers: {
        content: string,
        nextId: string
    }[],
    select: (selectAnswer:string, nextQuestionId: string) => void
}

const AnswersList: VFC<Props> = ({answers, select}) => {
    return (
        <AnswersBox >
            {answers.map((key, index) => {
                return <Answer answer={answers[index]} key={index.toString()} select={select} />
            })}
        </AnswersBox>
    );
};

export default AnswersList;

const AnswersBox = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  height: 192px;
`
