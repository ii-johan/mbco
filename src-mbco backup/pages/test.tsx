// my-embico-app/src/pages/test.tsx (변경 없음 - 기존 코드 유지)

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { testQuestions, Question } from '../data/testData'; // 경로는 실제 프로젝트에 맞게 확인해주세요.
import styles from './test.module.css';

interface UserAnswer {
  questionId: number;
  answer: number;
}

// 7점 척도 라벨 데이터 (새로운 텍스트로 변경)
const scaleLabels = [
  // 순서: 1점부터 7점까지
  { ko: "No++", ja: "全く違う", zh: "非常不同意", en: "Strongly Disagree" },   // 값 1
  { ko: "No+",  ja: "違う",     zh: "不同意",   en: "Disagree" },          // 값 2
  { ko: "No",   ja: "やや違う", zh: "有点不同意", en: "Slightly Disagree" }, // 값 3
  { ko: "Mid",  ja: "分からない", zh: "不确定",     en: "Neutral" },           // 값 4
  { ko: "Yes",  ja: "ややそうだ", zh: "有点同意",   en: "Slightly Agree" },    // 값 5
  { ko: "Yes+", ja: "そうだ",     zh: "同意",       en: "Agree" },             // 값 6
  { ko: "Yes++",ja: "非常にそうだ", zh: "非常同意",   en: "Strongly Agree" },    // 값 7
];

// 버튼 값 (1~7)에 따라 CSS 클래스를 반환하는 함수 (색상 조절용)
const getButtonColorClass = (value: number): string => {
    switch (value) {
        case 7: return styles.buttonColor7; // Yes++
        case 6: return styles.buttonColor6; // Yes+
        case 5: return styles.buttonColor5; // Yes
        case 4: return styles.buttonColor4; // Mid
        case 3: return styles.buttonColor3; // No
        case 2: return styles.buttonColor2; // No+
        case 1: return styles.buttonColor1; // No++
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

// 테스트 페이지 컴포넌트
function TestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMaxStrength, setCurrentMaxStrength] = useState<{ [key in Question['dimension']]: number }>({ EI: 1, SN: 1, TF: 1, JP: 1, AB: 1, HL: 1 });

  useEffect(() => {
    if (!router.isReady) return;
    const { length } = router.query;
    const testLength = length === '36' ? 36 : 72;
    let filteredQuestions: Question[] = (testLength === 36)
      ? testQuestions.filter(q => fastTestQuestionIds.includes(q.id)).sort((a, b) => a.id - b.id)
      : testQuestions;
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
        <Head><title>MBCO TEST - Loading...</title><meta name="description" content="Loading MBCO Test Questions" /></Head>
        <div className={styles.completionContainer}><h1>Loading Test...</h1><p>검사 데이터를 불러오고 있습니다. 잠시만 기다려 주세요.</p></div>
      </>
    );
  }

  if (questionsToUse.length === 0 && !isLoading) {
    return (
      <>
        <Head><title>MBCO TEST - Error</title><meta name="description" content="MBCO Test Error" /></Head>
        <div className={styles.completionContainer}><h1>오류 발생</h1><p>검사 데이터를 불러오는데 문제가 발생했습니다.</p><button onClick={() => router.push('/')} className={styles.resultButton}>홈으로 돌아가기</button></div>
      </>
    );
  }

  const currentQuestion = questionsToUse[currentQuestionIndex];

  if (currentQuestion) {
    return (
      <>
        <Head><title>{`MBCO TEST - Question ${currentQuestionIndex + 1}`}</title><meta name="description" content={`Question ${currentQuestionIndex + 1} of ${questionsToUse.length}`} /></Head>
        <div className={styles.container}>
          <div className={styles.questionArea}>
            <h1>질문 {currentQuestionIndex + 1} / {questionsToUse.length}</h1>
            <div className={styles.questionBox}>
              <h2>{currentQuestion.text_ko}</h2>
            </div>
          </div>

          <div className={styles.answerOptionsContainer}> {/* 클래스 이름 변경 고려: horizontalAnswerOptionsContainer -> answerOptionsContainer */}
            {[7, 6, 5, 4, 3, 2, 1].map((value) => { // 7(Yes++) 부터 1(No++) 순서로 버튼 생성
              const label = scaleLabels[value - 1]; // scaleLabels는 0-indexed (value 1 -> index 0)
              const buttonColorClass = getButtonColorClass(value);
              const displayButtonText = label.ko;

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
      <Head><title>MBCO TEST - Processing...</title><meta name="description" content="Processing MBCO Test Results" /></Head>
      <div className={styles.completionContainer}><h1>Processing Results...</h1><p>결과를 계산하고 페이지를 이동합니다.</p></div>
    </>
  );
}

export default TestPage;