// my-embico-app/src/pages/test.tsx (수정: 버튼 텍스트 줄바꿈 적용)

import React, { useState, useEffect } from 'react';
import { testQuestions, Question } from '../data/testData'; // 72개 전체 질문 데이터 임포트
import styles from './test.module.css'; // CSS 모듈 임포트
import { useRouter } from 'next/router'; // Next.js 라우터 임포트

// 사용자의 개별 답변을 저장할 객체의 타입을 정의합니다.
interface UserAnswer {
  questionId: number; // 답변한 질문의 고유 번호
  answer: number;     // 1~7 척도 값
}

// 7점 척도 라벨 데이터 (1: 매우 아니다 ~ 7: 매우 그렇다)
const scaleLabels = [
  { ko: "매우 아니다", ja: "全く違う", zh: "非常不同意", en: "Strongly Disagree" }, // 値 1
  { ko: "아니다", ja: "違う", zh: "不同意", en: "Disagree" }, // 値 2
  { ko: "약간 아니다", ja: "やや違う", zh: "有点不同意", en: "Slightly Disagree" }, // 値 3
  { ko: "모르겠다", ja: "分からない", zh: "不确定", en: "Neutral" }, // 値 4 (가운데)
  { ko: "약간 그렇다", ja: "ややそうだ", zh: "有点同意", en: "Slightly Agree" }, // 値 5
  { ko: "그렇다", ja: "そうだ", zh: "同意", en: "Agree" }, // 値 6
  { ko: "매우 그렇다", ja: "非常にそうだ", zh: "非常同意", en: "Strongly Agree" }, // 値 7
];

// Fast Test (36문항)에 포함될 질문 ID 목록
// 이 변수는 TestPage 컴포넌트 함수 '바깥'에 정의되어야 합니다.
const fastTestQuestionIds: number[] = [
    // JP (6개): {7:J, 14:P, 17:P, 21:P, 35:P, 41:J}
    7, 14, 17, 21, 35, 41,
    // EI (6개): {2:I, 4:I, 6:E, 16:E, 25:I, 31:E}
    2, 4, 6, 16, 25, 31,
    // S/N (6개): {1:N, 8:S, 9:N, 20:S, 28:N, 36:N}
    1, 8, 9, 20, 28, 36,
    // TF (6개): {5:T, 10:F, 23:T, 24:F, 26:T, 33:T}
    5, 10, 23, 24, 26, 33,
    // A/B (6개): {3:A, 12:A, 13:A, 15:A, 22:B, 29:A}
    3, 12, 13, 15, 22, 29,
    // H/L (6개): {11:H, 18:L, 19:H, 27:H, 34:L, 39:H}
    11, 18, 19, 27, 34, 39,
];


// 버튼 값 (1~7)에 따라 CSS 클래스를 반환하는 함수 (색상 조절용)
const getButtonColorClass = (value: number): string => {
    switch (value) {
        case 7: return styles.buttonColor7; // 매우 그렇다 (진한 초록)
        case 6: return styles.buttonColor6; // 그렇다 (초록)
        case 5: return styles.buttonColor5; // 조금 그렇다 (연한 초록)
        case 4: return styles.buttonColor4; // 모르겠다 (회색)
        case 3: return styles.buttonColor3; // 조금 아니다 (연한 주황)
        case 2: return styles.buttonColor2; // 아니다 (주황)
        case 1: return styles.buttonColor1; // 매우 아니다 (진한 주황)
        default: return '';
    }
};

// 점수 계산 함수 (TestPage 컴포넌트 외부에 정의) - 7점 척도 기반
const calculateScores = (answers: UserAnswer[]): { [key: string]: number } => {
  const scores: { [key: string]: number } = {
    EI: 0, SN: 0, TF: 0, JP: 0, AB: 0, HL: 0,
  };

  answers.forEach(answer => {
    const question = testQuestions.find(q => q.id === answer.questionId);

    if (question) {
      // 7점 척도(1-7) 답변 값을 -3 ~ +3 점수로 변환
      const scoreValue = answer.answer - 4; // 1->-3, 2->-2, 3->-1, 4->0, 5->+1, 6->+2, 7->+3

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
        // AB 차원 (안정성)
         else if (dimension === 'AB') {
              if (polarity === 'A') { scores.AB += scoreValue; }
              else if (polarity === 'B') { scores.AB -= scoreValue; }
         }
         // HL 차원 (정직성)
          else if (dimension === 'HL') {
               if (polarity === 'H') { scores.HL += scoreValue; }
               else if (polarity === 'L') { scores.HL -= scoreValue; }
          }
    }
  });

  return scores;
};


function TestPage() { // TestPage 컴포넌트 함수 시작
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  // 페이지 로드 시 URL 파라미터 읽고 질문 목록 필터링
  useEffect(() => {
    if (!router.isReady) {
        return;
    }

    console.log("Router ready. Query:", router.query);

    const { length } = router.query;
    const testLength = length === '36' ? 36 : 72;

    console.log(`Selected test length: ${testLength}`);

    let filteredQuestions: Question[] = [];

    if (testLength === 36) {
      filteredQuestions = testQuestions.filter(q => fastTestQuestionIds.includes(q.id));
      // filteredQuestions.sort((a, b) => a.id - b.id);
      console.log(`Fast Test: Loaded ${filteredQuestions.length} questions. IDs:`, filteredQuestions.map(q => q.id));

    } else {
      filteredQuestions = testQuestions;
      console.log(`Full Test: Loaded ${filteredQuestions.length} questions. IDs:`, filteredQuestions.map(q => q.id));
    }

    setQuestionsToUse(filteredQuestions);
    setIsLoading(false);

  }, [router.isReady, router.query]);


  // 답변 버튼 클릭 시 호출되는 함수 (자동 넘김 및 완료 시 자동 이동)
  const handleAnswerSelect = (answerValue: number) => {
    setSelectedAnswer(answerValue);
    console.log(`Question ${currentQuestion.id} answered with value ${answerValue}`);

    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: answerValue
    };

    const updatedAnswers = [...userAnswers, newUserAnswer];
    setUserAnswers(updatedAnswers);
    console.log(`Answer saved for Q${currentQuestion.id}. Total answers: ${updatedAnswers.length}`);

     if (currentQuestionIndex < questionsToUse.length - 1) {
         setTimeout(() => {
             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
             setSelectedAnswer(null);
             console.log(`Moving to next question. New index: ${currentQuestionIndex + 1}`);
         }, 300);
     } else {
          console.log("Last question answered. Preparing for results.");
          setTimeout(() => {
              console.log("Calculating scores and navigating to results page...");
              const finalScores = calculateScores(updatedAnswers);
              console.log("Calculated Final Scores:", finalScores);

              router.push({
                  pathname: '/results',
                  query: { scores: JSON.stringify(finalScores) }
              });

          }, 500);
     }
  };


  // 로딩 중이면 로딩 메시지 표시
  if (isLoading) {
      return (
          <div className={styles.completionContainer}>
              <h1>Loading Test...</h1>
              <p>검사 데이터를 불러오고 있습니다. 잠시만 기다려 주세요.</p>
          </div>
      );
  }

  // 테스트에 사용할 질문 목록이 로드되지 않았거나 문제가 발생한 경우
  if (questionsToUse.length === 0 && !isLoading) {
       console.error("질문 목록이 로드되지 않았거나 비어있습니다. testData.ts 파일과 URL 파라미터 확인 필요.");
      return (
           <div className={styles.completionContainer}>
              <h1>오류 발생</h1>
              <p>검사 데이터를 불러는데 문제가 발생했습니다. testData.ts 파일과 질문 개수를 확인해주세요.</p>
               <button onClick={() => router.push('/')} className={styles.resultButton}>
                   홈으로 돌아가기
               </button>
          </div>
      );
  }


  // 현재 표시할 질문 데이터 가져오기 (questionsToUse 배열에서 가져옴)
  const currentQuestion = questionsToUse[currentQuestionIndex];

  // 현재 질문이 유효하면 검사 페이지 표시
  if (currentQuestion) {
      return (
        <div className={styles.container}>
          <div className={styles.questionArea}>
            <h1>질문 {currentQuestionIndex + 1} / {questionsToUse.length}</h1>
            {/* 질문 내용을 노란색 직사각형 박스로 감싸기 */}
            <div className={styles.questionBox}>
               <h2>{currentQuestion.text_ko}</h2> {/* 한국어 질문 표시 */}
            </div>
          </div>

          {/* 답변 선택 옵션 (7개 버튼) 컨테이너 */}
          <div className={styles.horizontalAnswerOptionsContainer}>
            {/* 7개 버튼 렌더링 (7부터 1까지) */}
            {[7, 6, 5, 4, 3, 2, 1].map((value) => {
              const label = scaleLabels[value - 1];

              // 버튼 색상 클래스 적용
              const buttonColorClass = getButtonColorClass(value);

              // **** 버튼 텍스트 줄바꿈 처리 ****
              const buttonTextKo = label.ko;
              let displayButtonText;

              // 특정 라벨에 대해 줄바꿈 적용
              if (buttonTextKo === "매우 그렇다") {
                  displayButtonText = (
                      <>
                          매우 <br /> 그렇다
                      </>
                  );
              } else if (buttonTextKo === "약간 그렇다") {
                   displayButtonText = (
                      <>
                          약간 <br /> 그렇다
                      </>
                   );
              } else if (buttonTextKo === "모르겠다") {
                   displayButtonText = (
                      <>
                          모르 <br /> 겠다
                      </>
                   );
              } else if (buttonTextKo === "약간 아니다") {
                   displayButtonText = (
                      <>
                          약간 <br /> 아니다
                      </>
                   );
              } else if (buttonTextKo === "매우 아니다") {
                   displayButtonText = (
                      <>
                          매우 <br /> 아니다
                      </>
                   );
              }
               else {
                  // 나머지 라벨 (그렇다, 아니다)는 줄바꿈 없이 그대로 표시
                  displayButtonText = buttonTextKo;
              }
              // **********************************


              return (
                // 개별 답변 버튼
                <button
                  key={value}
                  onClick={() => handleAnswerSelect(value)}
                  className={`${styles.answerButton} ${buttonColorClass} ${selectedAnswer === value ? styles.selected : ''}`}
                >
                    {/* 버튼 텍스트 표시 (줄바꿈 적용된 내용) */}
                    {displayButtonText}
                </button>
              );
            })}
          </div>


        </div>
      );
  }

  // 모든 질문 답변 완료 후 자동 이동 전 짧은 순간
  return (
      <div className={styles.completionContainer}>
          <h1>Processing Results...</h1>
          <p>결과를 계산하고 페이지를 이동합니다.</p>
      </div>
  );
}

export default TestPage;
