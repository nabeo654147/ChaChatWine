import React, {useState, useCallback, useEffect, useRef, VFC} from 'react';
// import {db} from './firebase/index'
import AnswersList from '../AnswersList';
import Chats from '../Chats'
import defaultDataset from '../dataset'
import styled from 'styled-components';
// import {FormDialog} from "../FormDialog";

type Dataset = {
  [currentId: string]:{
    answers: {
      content: string,
      nextId: string
    }[],
    question: string
  }
}

type AnswersProps = {
  content: string,
  nextId: string
}[]

type ChatsProps = {
    type: 'question' | 'answers',
    text: string
}[]

const ChatBot: VFC = () => {
  const [answers, setAnswers] = useState<AnswersProps>([]); // 回答コンポーネントに表示するデータ
  const [chats, setChats] = useState<ChatsProps>([]);// チャットコンポーネントに表示するデータ
  const [currentId, setCurrentId] = useState<string>('init');// 現在の質問ID
  const [dataset, setDataset] = useState<Dataset>(defaultDataset); // 質問と回答のデータセット
  const [open, setOpen] = useState<boolean>(false); // 問い合わせフォーム用モーダルの開閉を管理
  const scrollRef = useRef<HTMLDivElement>(null);

  // 問い合わせフォーム用モーダルを開くCallback関数
  const handleOpen = useCallback(() => {
      setOpen(true)
  },[setOpen]);

  // 問い合わせフォーム用モーダルを閉じるCallback関数
  const handleClose = useCallback(() => {
      setOpen(false)
  },[setOpen]);

  // 新しいチャットを追加するCallback関数
  const addChats = useCallback((chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  },[setChats]);

  // 次の質問をチャットエリアに表示する関数
  const displayNextQuestion = (nextQuestionId: string, nextDataset: { question: any; answers: React.SetStateAction<AnswersProps>; }) => {
    // 選択された回答と次の質問をチャットに追加
    addChats({
      text: nextDataset.question,
      type: 'question'
    });
   // 次の回答一覧をセット
    setAnswers(nextDataset.answers)

    // 現在の質問IDをセット
    setCurrentId(nextQuestionId)
  }

    // 回答が選択された時に呼ばれる関数
    const selectAnswer = useCallback((selectedAnswer: string, nextQuestionId: string) => {
        switch (true) {
            // お問い合わせが選択された場合
            case (nextQuestionId === 'contact'):
                handleOpen();
                break;

            // リンクが選択された時
            case /^https:*/.test(nextQuestionId):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;

            // 選択された回答をchatsに追加
            default:
                // 現在のチャット一覧を取得
                addChats({
                    text: selectedAnswer,
                    type: 'answer'
                })

                setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750)
                break;
        }
    },[answers]);

    // 最初の質問をチャットエリアに表示する
  useEffect(() => {
    setDataset(defaultDataset);
    displayNextQuestion(currentId, defaultDataset.init)
  },[])

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

  // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
          top: scrollRef.current.offsetTop,
          behavior: 'smooth'
      });
    }
  })

    return (
        <Section >
            <ChatBox ref={scrollRef} >
                {/* {(Object.keys(dataset).length === 0) ? (
                    <div />
                ) : ( */}
                    <>
                        <Chats chats={chats} />
                        <AnswersList answers={answers} select={selectAnswer}/>
                    </>
                {/* )} */}
                {/* <FormDialog open={open} handleOpen={handleOpen} handleClose={handleClose}/> */}
            </ChatBox>
        </Section>
    )
}

export default ChatBot;

const Section = styled.section`
  background: #ffd8d8;
  position: relative;
  height: 100vh;
  width: 100%;
`

const ChatBox = styled.div`
  background: #ffa4a4;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 4px;
  box-sizing: border-box;
  height: 592px;
  max-width: 432px;
  padding: 0 1rem;
  width: 100%;
  overflow: scroll;

  /* Vertical and horizontal center alignment */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

// .p-question__title {
//   font-size: 1.25rem;
//   font-weight: 600;
//   margin: 0 0 1rem 0;
// }

// .p-question__description {
//   font-size: 1rem;
//   letter-spacing: .125rem;
//   line-height: 1.7;
// }
