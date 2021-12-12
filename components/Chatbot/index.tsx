import React, { useState, useCallback, useEffect, useRef, VFC } from 'react';
import AnswersList from '../molecules/AnswersList';
import Chats from '../molecules/Chats';
import defaultDataset from '../dataset';
import styled from 'styled-components';
import SuggestionModal, { SuggestionData } from '../organisms/SuggestionModal';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

type Dataset = {
  [currentId: string]: {
    answers: {
      content: string;
      nextId: string;
    }[];
    question: string;
  };
};

type AnswersProps = {
  content: string;
  nextId: string;
}[];

type ChatsProps = {
  type: 'question' | 'answers';
  text: string;
}[];

const ChatBot: VFC = () => {
  const [answers, setAnswers] = useState<AnswersProps>([]);
  const [chats, setChats] = useState<ChatsProps>([]);
  const [currentId, setCurrentId] = useState<string>('init');
  const [dataset, setDataset] = useState<Dataset>(defaultDataset);
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<SuggestionData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(
    async (nextQuestionId: string) => {
      setLoading(true);

      try {
        const q = query(collection(db, 'suggestionData'), where('wine', '==', `${nextQuestionId}`));
        const snapShots = await getDocs(q);
        const itemsData: SuggestionData[] = [];
        snapShots.forEach((doc) => {
          itemsData.push(doc.data() as SuggestionData);
        });
        setItems(itemsData);
      } catch (error) {
        return Promise.reject(error);
      }
      return [setOpen(true), setLoading(false)];
    },
    [open],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const addChats = useCallback(
    (chat) => {
      setChats((prevChats) => {
        return [...prevChats, chat];
      });
    },
    [setChats],
  );

  const displayNextQuestion = (
    nextQuestionId: string,
    nextDataset: { question: string; answers: React.SetStateAction<AnswersProps> },
  ) => {
    addChats({
      text: nextDataset.question,
      type: 'question',
    });
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  };

  const selectAnswer = useCallback(
    (selectedAnswer: string, nextQuestionId: string) => {
      switch (true) {
        case nextQuestionId === 'Chardonnay':
          handleOpen(nextQuestionId);
          break;

        case /^https:*/.test(nextQuestionId):
          const a = document.createElement('a');
          a.href = nextQuestionId;
          a.target = '_blank';
          a.click();
          break;

        default:
          addChats({
            text: selectedAnswer,
            type: 'answer',
          });

          setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750);
          break;
      }
    },
    [answers],
  );

  // 最初の質問をチャットエリアに表示する
  useEffect(() => {
    setDataset(defaultDataset);
    displayNextQuestion(currentId, defaultDataset.init);
  }, []);

  // useEffect(() => {
  //     (async() => {
  //         const initDataset = {};

  //         // Fetch questions dataset from Firestore
  //         await db.collection('questions').get().then(snapshots => {
  //             snapshots.forEach(doc => {
  //                 initDataset[doc.id] = doc.data()
  //             })
  //         });

  //         // Firestoreから取得したデータセットを反映
  //         setDataset(initDataset);

  //         // 最初の質問を表示
  //         displayNextQuestion(currentId, initDataset[currentId])
  //     })();
  // }, []);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [answers]);

  return (
    <Section>
      <ChatBox ref={scrollRef}>
        {/* {(Object.keys(dataset).length === 0) ? (
                    <div />
                ) : ( */}
        <>
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer} />
        </>
        {/* )} */}
        <SuggestionModal open={open} loading={loading} items={items} handleClose={handleClose} />
      </ChatBox>
    </Section>
  );
};

export default ChatBot;

const Section = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const ChatBox = styled.div`
  background-image: url('/img/chatback.jpg');
  border: 1px solid #87862af5;
  border-radius: 10px;
  box-sizing: border-box;
  height: 90%;
  max-width: 432px;
  padding: 0 1rem;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
