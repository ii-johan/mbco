// my-embico-app/src/pages/test.tsx (오류 수정 및 레이블 업데이트)

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { testQuestions, Question } from '../data/testData';
import styles from './test.module.css';

interface UserAnswer {
  questionId: number;
  answer: number;
}

// 7점 척도 라벨 데이터 (요청사항 반영: "약간" -> "조금")
const scaleLabels = [
  { ko: "매우 아니다", ja: "全く違う", zh: "非常不同意", en: "Strongly Disagree" }, // 값 1
  { ko: "아니다", ja: "違う", zh: "不同意", en: "Disagree" }, // 값 2
  { ko: "조금 아니다", ja: "やや違う", zh: "有点不同意", en: "Slightly Disagree" }, // 값 3 (수정됨)
  { ko: "모르겠다", ja: "分からない", zh: "不确定", en: "Neutral" }, // 값 4 (가운데)
  { ko: "조금 그렇다", ja: "ややそうだ", zh: "有点同意", en: "Slightly Agree" }, // 값 5 (수정됨)
  { ko: "그렇다", ja: "そうだ", zh: "同意", en: "Agree" }, // 값 6
  { ko: "매우 그렇다", ja: "非常にそうだ", zh: "非常同意", en: "Strongly Agree" }, // 값 7
];

// ... (getButtonColorClass, calculateScores, calculateMaxStrength, fastTestQuestionIds 등 나머지 코드는 이전과 동일) ...
const getButtonColorClass = (value: number): string => {
    switch (value) {
        case 7: return styles.buttonColor7;
        case 6: return styles.buttonColor6;
        case 5: return styles.buttonColor5;
        case 4: return styles.buttonColor4;
        case 3: return styles.buttonColor3;
        case 2: return styles.buttonColor2;
        case 1: return styles.buttonColor1;
        default: return '';
    }
};

const fastTestQuestionIds: number[] = [
    1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 17, 21, 23, 25, 26, 28, 30, 31, 32, 33, 34, 35, 39, 40, 43, 44, 45, 47, 52, 55, 58, 59, 61, 63, 67, 68
];

const calculateScores = (answers: UserAnswer[]): { [key: string]: number } => {
  const scores: { [key: string]: number } = { EI: 0, SN: 0, TF: 0, JP: 0, AB: 0, HL: 0,};
  answers.forEach(answer => {
    const question = testQuestions.find(q => q.id === answer.questionId);
    if (question) {
      const scoreValue = answer.answer - 4;
      const dimension = question.dimension;
      const polarity = question.polarity;
      if (dimension === 'EI') {
        if (polarity === 'E') { scores.EI += scoreValue; }
        else if (polarity === 'I') { scores.EI -= scoreValue; }
      }
      else if (dimension === 'SN') {
        if (polarity === 'N') { scores.SN += scoreValue; }
        else if (polarity === 'S') { scores.SN -= scoreValue; }
      }
      else if (dimension === 'TF') {
        if (polarity === 'T') { scores.TF += scoreValue; }
        else if (polarity === 'F') { scores.TF -= scoreValue; }
      }
      else if (dimension === 'JP') {
        if (polarity === 'J') { scores.JP += scoreValue; }
        else if (polarity === 'P') { scores.JP -= scoreValue; }
      }
      else if (dimension === 'AB') {
        if (polarity === 'A') { scores.AB += scoreValue; }
        else if (polarity === 'B') { scores.AB -= scoreValue; }
      }
      else if (dimension === 'HL') {
        if (polarity === 'H') { scores.HL += scoreValue; }
        else if (polarity === 'L') { scores.HL -= scoreValue; }
      }
    }
  });
  return scores;
};

const calculateMaxStrength = (questions: Question[]): { [key in Question['dimension']]: number } => {
    const dimensions: (keyof { EI: any, SN: any, TF: any, JP: any, AB: any, HL: any })[] = ['EI', 'SN', 'TF', 'JP', 'AB', 'HL'];
    const strengthMap: { [key in Question['dimension']]: number } = { EI: 0, SN: 0, TF: 0, JP: 0, AB: 0, HL: 0,};
    dimensions.forEach(dim => {
        const dimQuestions = questions.filter(q => q.dimension === dim);
        if (dimQuestions.length > 0) {
            strengthMap[dim] = dimQuestions.length * 3;
        } else {
            strengthMap[dim] = 1; 
        }
    });
    return strengthMap;
};


function TestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMaxStrength, setCurrentMaxStrength] = useState<{ [key in Question['dimension']]: number }>({ EI: 1, SN: 1, TF: 1, JP: 1, AB: 1, HL: 1 });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { length } = router.query;
    const testLength = length === '36' ? 36 : 72;
    let filteredQuestions: Question[] = [];
    if (testLength === 36) {
      filteredQuestions = testQuestions.filter(q => fastTestQuestionIds.includes(q.id));
      filteredQuestions.sort((a, b) => a.id - b.id);
    } else {
      filteredQuestions = testQuestions;
    }
    setQuestionsToUse(filteredQuestions);
    setCurrentMaxStrength(calculateMaxStrength(filteredQuestions));
    setIsLoading(false);
  }, [router.isReady, router.query]);

  const handleAnswerSelect = (answerValue: number) => {
    setSelectedAnswer(answerValue);
    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: answerValue
    };
    const updatedAnswers = [...userAnswers, newUserAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questionsToUse.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
      }, 300);
    } else {
      setTimeout(() => {
        const finalScores = calculateScores(updatedAnswers);
        router.push({
          pathname: '/results',
          query: {
            scores: JSON.stringify(finalScores),
            maxStrengths: JSON.stringify(currentMaxStrength)
          }
        });
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>MBCO TEST - Loading...</title>
          <meta name="description" content="Loading MBCO Test Questions" />
        </Head>
        <div className={styles.completionContainer}>
          <h1>Loading Test...</h1>
          <p>검사 데이터를 불러오고 있습니다. 잠시만 기다려 주세요.</p>
        </div>
      </>
    );
  }

  if (questionsToUse.length === 0 && !isLoading) {
    return (
      <>
        <Head>
          <title>MBCO TEST - Error</title>
          <meta name="description" content="MBCO Test Error" />
        </Head>
        <div className={styles.completionContainer}>
          <h1>오류 발생</h1>
          <p>검사 데이터를 불러오는데 문제가 발생했습니다. testData.ts 파일과 질문 개수를 확인해주세요.</p>
          <button onClick={() => router.push('/')} className={styles.resultButton}>
            홈으로 돌아가기
          </button>
        </div>
      </>
    );
  }

  const currentQuestion = questionsToUse[currentQuestionIndex];

  if (currentQuestion) {
    return (
      <>
        <Head>
          <title>{`MBCO TEST - Question ${currentQuestionIndex + 1}`}</title>
          <meta name="description" content={`Question ${currentQuestionIndex + 1} of ${questionsToUse.length}`} />
        </Head>
        <div className={styles.container}>
          <div className={styles.questionArea}>
            <h1>질문 {currentQuestionIndex + 1} / {questionsToUse.length}</h1>
            <div className={styles.questionBox}>
              <h2>{currentQuestion.text_ko}</h2>
            </div>
          </div>

          <div className={styles.horizontalAnswerOptionsContainer}>
            {[7, 6, 5, 4, 3, 2, 1].map((value) => {
              // label, buttonColorClass, buttonTextKo 정의를 이 위치에!
              const label = scaleLabels[value - 1];
              const buttonColorClass = getButtonColorClass(value);
              const buttonTextKo = label.ko; // ***** 여기가 중요합니다. buttonTextKo 정의! *****
              let displayButtonText;

              // buttonTextKo를 사용하는 로직은 그 정의 다음에 와야 합니다.
              // "약간"을 "조금"으로 사용하는 scaleLabels에 맞춰 조건문 수정
              if (buttonTextKo === "매우 그렇다") {
                displayButtonText = ( <> 매우 <br /> 그렇다 </> );
              } else if (buttonTextKo === "조금 그렇다") { // "조금 그렇다"로 확인
                displayButtonText = ( <> 조금 <br /> 그렇다 </> );
              } else if (buttonTextKo === "모르겠다") {
                displayButtonText = ( <> 모르 <br /> 겠다 </> );
              } else if (buttonTextKo === "조금 아니다") { // "조금 아니다"로 확인
                displayButtonText = ( <> 조금 <br /> 아니다 </> );
              } else if (buttonTextKo === "매우 아니다") {
                displayButtonText = ( <> 매우 <br /> 아니다 </> );
              } else { // "그렇다", "아니다"의 경우
                displayButtonText = buttonTextKo;
              }

              return (
                <button
                  key={value}
                  onClick={() => handleAnswerSelect(value)}
                  className={`${styles.answerButton} ${buttonColorClass} ${selectedAnswer === value ? styles.selected : ''}`}
                >
                  {displayButtonText}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>MBCO TEST - Processing...</title>
        <meta name="description" content="Processing MBCO Test Results" />
      </Head>
      <div className={styles.completionContainer}>
        <h1>Processing Results...</h1>
        <p>결과를 계산하고 페이지를 이동합니다.</p>
      </div>
    </>
  );
}

export default TestPage;