// my-embico-app/src/pages/test.tsx (수정본 - 결과 데이터 전달 포함)

import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // Next.js의 Head 컴포넌트 임포트
import { useRouter } from 'next/router'; // Next.js 라우터 임포트

// testData.ts 파일에서 전체 질문 데이터와 Question 타입을 임포트합니다.
// 실제 프로젝트 구조에 맞게 경로를 확인하세요.
import { testQuestions, Question } from '../data/testData';

// CSS Modules 파일 임포트
import styles from './test.module.css';

// 사용자의 개별 답변을 저장할 객체의 타입을 정의합니다.
interface UserAnswer {
  questionId: number; // 답변한 질문의 고유 번호
  answer: number;     // 1~7 척도 값 (1:매우 아니다 ~ 7:매우 그렇다)
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
// *************************************************


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
// 이 함수는 testData.ts에서 임포트한 testQuestions를 사용합니다.
const calculateScores = (answers: UserAnswer[]): { [key: string]: number } => {
  const scores: { [key: string]: number } = {
    EI: 0, SN: 0, TF: 0, JP: 0, AB: 0, HL: 0,
    // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 추가
    // O: 0, C: 0, EM: 0,
  };

  answers.forEach(answer => {
    // testQuestions 배열에서 해당 ID의 질문 객체를 찾습니다.
    const question = testQuestions.find(q => q.id === answer.questionId);

    if (question) {
      // 7점 척도(1-7) 답변 값을 -3 ~ +3 점수로 변환
      const scoreValue = answer.answer - 4; // 1->-3, 2->-2, 3->-1, 4->0, 5->+1, 6->+2, 7->+3

      const dimension = question.dimension;
      // Question 타입에 polarity 속성이 있다고 가정합니다.
      // 만약 testData.ts의 Question 타입에 polarity가 없다면 이 부분 수정 필요.
      const polarity = question.polarity;

      // 각 차원에 대해 점수 합산 로직 적용
      // polarity가 'E', 'N', 'T', 'J', 'A', 'H'일 때 scoreValue를 그대로 더하고,
      // 'I', 'S', 'F', 'P', 'B', 'L'일 때 scoreValue를 빼거나 반전시켜 더합니다.
      // 이는 '매우 그렇다'(+3)가 해당 극성 방향으로 점수를 높이는 방식입니다.
      if (dimension === 'EI') {
          if (polarity === 'E') { scores.EI += scoreValue; }
          else if (polarity === 'I') { scores.EI -= scoreValue; } // I 방향은 E와 반대 점수
      }
      else if (dimension === 'SN') {
           if (polarity === 'N') { scores.SN += scoreValue; }
           else if (polarity === 'S') { scores.SN -= scoreValue; } // S 방향은 N과 반대 점수
      }
       else if (dimension === 'TF') {
            if (polarity === 'T') { scores.TF += scoreValue; }
            else if (polarity === 'F') { scores.TF -= scoreValue; } // F 방향은 T와 반대 점수
       }
        else if (dimension === 'JP') {
             if (polarity === 'J') { scores.JP += scoreValue; }
             else if (polarity === 'P') { scores.JP -= scoreValue; } // P 방향은 J와 반대 점수
        }
        // AB 차원 (HEXACO Agreeableness/Emotionality 일부)
         else if (dimension === 'AB') {
              // AB 차원의 polarity 'A'와 'B'에 따라 점수 합산
              // 'A'는 Agreeableness (원만성) 또는 Emotionality의 낮은 극성 (낮은 분노/취약성)
              // 'B'는 Emotionality의 높은 극성 (높은 분노/취약성) 또는 Agreeableness의 낮은 극성 (비원만성)
              // 사용자분의 testData.ts 매핑에 따라 이 로직이 맞는지 다시 확인 필요
              if (polarity === 'A') { scores.AB += scoreValue; } // 'A' 방향일 때 점수 증가
              else if (polarity === 'B') { scores.AB -= scoreValue; } // 'B' 방향일 때 점수 감소
         }
         // HL 차원 (HEXACO Honesty-Humility)
          else if (dimension === 'HL') {
               // HL 차원의 polarity 'H'와 'L'에 따라 점수 합산
               // 'H'는 Honesty-Humility (정직성/겸손)의 높은 극성
               // 'L'는 Honesty-Humility (정직성/겸손)의 낮은 극성
               // 사용자분의 testData.ts 매핑에 따라 이 로직이 맞는지 다시 확인 필요
               if (polarity === 'H') { scores.HL += scoreValue; } // 'H' 방향일 때 점수 증가
               else if (polarity === 'L') { scores.HL -= scoreValue; } // 'L' 방향일 때 점수 감소
          }
           // TODO: O (Openness), C (Conscientiousness), EM (Emotionality) 차원 계산 로직 추가
           /*
           else if (dimension === 'O') { ... }
           else if (dimension === 'C') { ... }
           else if (dimension === 'EM') { ... } // EM 차원 계산 로직 (사용자 정의 EM 차원 사용 시)
           */
    }
  });

  return scores;
};


// 각 차원별 최대 총점 절대값 계산 함수
// 이 함수는 특정 문항 배열을 받아 해당 문항들의 최대 총점 절대값을 계산합니다.
const calculateMaxStrength = (questions: Question[]): { [key in Question['dimension']]: number } => {
    // 모든 가능한 차원 목록
    const dimensions: (keyof { EI: any, SN: any, TF: any, JP: any, AB: any, HL: any })[] = ['EI', 'SN', 'TF', 'JP', 'AB', 'HL'];
    // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 추가
    // const dimensions: (keyof { EI: any, SN: any, TF: any, JP: any, AB: any, HL: any, O: any, C: any, EM: any })[] = ['EI', 'SN', 'TF', 'JP', 'AB', 'HL', 'O', 'C', 'EM'];


    const strengthMap: { [key in Question['dimension']]: number } = {
        EI: 0, SN: 0, TF: 0, JP: 0, AB: 0, HL: 0,
         // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 초기값 추가
        // O: 0, C: 0, EM: 0,
    };

    dimensions.forEach(dim => {
        // 현재 테스트에 사용되는 질문들 중에서 해당 차원의 질문만 필터링
        const dimQuestions = questions.filter(q => q.dimension === dim);
        if (dimQuestions.length > 0) {
            // 해당 차원의 최대 총점 = 문항 수 * 최대 점수 (3점)
            strengthMap[dim] = dimQuestions.length * 3;
        } else {
             // 해당 차원의 문항이 없을 경우 0으로 나누는 오류 방지를 위해 최소값 설정
             // 결과 계산 시 이 값이 사용되지 않도록 로직 수정 필요 (해당 차원은 결과에 포함X)
             // 또는 결과 계산 시 해당 차원이 0으로 나누는 것을 방지
             strengthMap[dim] = 1; // 임시로 1 설정
        }
    });
    return strengthMap;
};


// 테스트 페이지 컴포넌트
function TestPage() {
  const router = useRouter(); // Next.js 라우터 훅
  // 현재 표시할 질문의 인덱스 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 사용자가 현재 질문에서 선택한 답변 값 (1~7) 상태
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  // 사용자의 모든 답변을 저장하는 배열 상태
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  // 현재 테스트에 사용될 질문 목록 상태 (Fast 또는 Full에 따라 필터링됨)
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  // 데이터 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 각 차원별 최대 총점 절대값 상태 (결과 계산 시 사용)
  const [currentMaxStrength, setCurrentMaxStrength] = useState<{ [key in Question['dimension']]: number }>({ EI: 1, SN: 1, TF: 1, JP: 1, AB: 1, HL: 1 }); // 초기값 설정 (0으로 나누기 방지)
  // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 초기값 추가
  // { EI: 1, SN: 1, TF: 1, JP: 1, AB: 1, HL: 1, O: 1, C: 1, EM: 1 }


  // **** 페이지 로드 시 (컴포넌트 마운트 시) 실행되는 이펙트 ****
  // URL 파라미터를 읽고 테스트 타입에 맞는 질문 목록을 필터링합니다.
  useEffect(() => {
    // Next.js 라우터가 준비되어 쿼리 파라미터에 접근 가능할 때까지 기다립니다.
    if (!router.isReady) {
        console.log("Router not ready yet.");
        return;
    }

    console.log("Router ready. Query:", router.query);

    // URL 쿼리 파라미터에서 'length' 값을 가져옵니다.
    const { length } = router.query;
    // 'length' 값이 '36'이면 36문항 테스트, 아니면 72문항 테스트로 결정합니다.
    const testLength = length === '36' ? 36 : 72;

    console.log(`Selected test length: ${testLength}`);

    let filteredQuestions: Question[] = [];

    if (testLength === 36) {
      // Fast Test (36문항): fastTestQuestionIds 목록에 ID가 포함된 질문만 필터링합니다.
      // fastTestQuestionIds 변수는 컴포넌트 바깥에 정의되어 있습니다.
      filteredQuestions = testQuestions.filter(q => fastTestQuestionIds.includes(q.id));
      // 필터링된 질문들을 원래 testQuestions의 ID 순서대로 다시 정렬합니다. (선택 사항)
      filteredQuestions.sort((a, b) => a.id - b.id);
      console.log(`Fast Test: Loaded ${filteredQuestions.length} questions. IDs:`, filteredQuestions.map(q => q.id));

    } else {
      // Full Test (72문항): testQuestions 배열 전체를 사용합니다.
      // testQuestions 배열 자체가 이미 ID 순서대로 정렬되어 있다고 가정합니다.
      filteredQuestions = testQuestions;
      console.log(`Full Test: Loaded ${filteredQuestions.length} questions. IDs:`, filteredQuestions.map(q => q.id));
    }

    // 필터링된 질문 목록으로 상태를 업데이트합니다.
    setQuestionsToUse(filteredQuestions);
    // 필터링된 질문 목록을 기반으로 각 차원의 최대 강도를 다시 계산하여 상태 업데이트
    setCurrentMaxStrength(calculateMaxStrength(filteredQuestions));
    // 로딩 상태를 false로 변경하여 테스트 화면을 표시합니다.
    setIsLoading(false);

  }, [router.isReady, router.query]); // 라우터 준비 상태와 쿼리가 변경될 때마다 이펙트 재실행


  // **** 답변 버튼 클릭 시 호출되는 함수 ****
  // 사용자의 답변을 기록하고, 다음 문항으로 이동하거나 테스트를 완료합니다.
  const handleAnswerSelect = (answerValue: number) => {
    // 사용자가 선택한 답변 값을 상태에 저장 (선택 효과를 위해 사용)
    setSelectedAnswer(answerValue);
    console.log(`Question ${currentQuestion.id} answered with value ${answerValue}`);

    // 현재 질문에 대한 사용자 답변 객체 생성
    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: answerValue
    };

    // 기존 답변 배열에 새로운 답변 추가하여 상태 업데이트
    const updatedAnswers = [...userAnswers, newUserAnswer];
    setUserAnswers(updatedAnswers);
    console.log(`Answer saved for Q${currentQuestion.id}. Total answers: ${updatedAnswers.length}`);

     if (currentQuestionIndex < questionsToUse.length - 1) { // 현재 문항이 마지막 문항이 아니면
         // 짧은 딜레이 후 다음 문항으로 이동
         setTimeout(() => {
             setCurrentQuestionIndex(prevIndex => prevIndex + 1); // 문항 인덱스 증가
             setSelectedAnswer(null); // 다음 질문을 위해 선택 상태 초기화
             console.log(`Moving to next question. New index: ${currentQuestionIndex + 1}`);
         }, 300); // 300ms 딜레이
     } else { // 현재 문항이 마지막 문항이면
          console.log("Last question answered. Preparing for results.");
          // 짧은 딜레이 후 결과 계산 및 결과 페이지로 이동
          setTimeout(() => {
              console.log("Calculating scores and navigating to results page...");
              // 마지막 답변이 포함된 updatedAnswers 배열을 사용하여 최종 점수 계산
              const finalScores = calculateScores(updatedAnswers);
              console.log("Calculated Final Scores:", finalScores);
              console.log("Calculated Max Strengths:", currentMaxStrength); // 최대 강도도 로그 출력

              // 결과 페이지로 이동하며 점수와 최대 강도 데이터를 쿼리 파라미터로 전달
              router.push({
                  pathname: '/results', // 결과 페이지 경로
                  query: {
                       scores: JSON.stringify(finalScores), // 계산된 점수 데이터를 JSON 문자열로 변환하여 쿼리로 전달
                       maxStrengths: JSON.stringify(currentMaxStrength) // <-- 각 차원의 최대 강도 데이터를 JSON 문자열로 변환하여 쿼리로 전달
                   }
              });

          }, 500); // Navigate after 500ms delay
     }
  };
  // **** End of handleAnswerSelect function ****


  // **** Component Rendering Section ****

  // 로딩 중 상태일 때 표시할 UI
  if (isLoading) {
      return (
          <>
              {/* 페이지 제목 설정 */}
              <Head>
                  <title>MBCO TEST - Loading...</title>
                  <meta name="description" content="Loading MBCO Test Questions" />
                  {/* 파비콘 등 필요한 메타데이터 추가 */}
              </Head>
              {/* 로딩 메시지를 표시하는 컨테이너 */}
              <div className={styles.completionContainer}> {/* completionContainer 스타일 재활용 */}
                  <h1>Loading Test...</h1>
                  <p>검사 데이터를 불러오고 있습니다. 잠시만 기다려 주세요.</p>
              </div>
          </>
      );
  }

  // 테스트에 사용할 질문 목록이 로드되지 않았거나 비어있는 경우 (오류 상태)
  if (questionsToUse.length === 0 && !isLoading) {
       console.error("질문 목록이 로드되지 않았거나 비어있습니다. testData.ts 파일과 URL 파라미터 확인 필요.");
      return (
           <>
              {/* 페이지 제목 설정 */}
              <Head>
                  <title>MBCO TEST - Error</title>
                  <meta name="description" content="MBCO Test Error" />
                  {/* 파비콘 등 필요한 메타데이터 추가 */}
              </Head>
               {/* 오류 메시지를 표시하는 컨테이너 */}
               <div className={styles.completionContainer}> {/* completionContainer 스타일 재활용 */}
                  <h1>오류 발생</h1>
                  <p>검사 데이터를 불러오는데 문제가 발생했습니다. testData.ts 파일과 질문 개수를 확인해주세요.</p>
                   {/* 홈으로 돌아가기 버튼 */}
                   <button onClick={() => router.push('/')} className={styles.resultButton}> {/* resultButton 스타일 재활용 */}
                       홈으로 돌아가기
                   </button>
              </div>
           </>
      );
  }


  // 현재 표시할 질문 데이터 가져오기 (questionsToUse 배열에서 현재 인덱스에 해당하는 질문)
  const currentQuestion = questionsToUse[currentQuestionIndex];

  // 현재 질문이 유효하면 (null 또는 undefined가 아니면) 검사 페이지 UI 표시
  if (currentQuestion) {
      return (
        <>
            {/* 페이지 제목 설정 */}
            <Head>
                <title>{`MBCO TEST - Question ${currentQuestionIndex + 1}`}</title>
                <meta name="description" content={`Question ${currentQuestionIndex + 1} of ${questionsToUse.length}`} />
                {/* 파비콘 등 필요한 메타데이터 추가 */}
            </Head>
            {/* 검사 페이지 전체 컨테이너 */}
            <div className={styles.container}>
              {/* 질문 영역 */}
              <div className={styles.questionArea}>
                {/* 질문 번호 표시 */}
                <h1>질문 {currentQuestionIndex + 1} / {questionsToUse.length}</h1>
                {/* 질문 내용을 노란색 직사각형 박스로 감싸기 */}
                <div className={styles.questionBox}>
                   <h2>{currentQuestion.text_ko}</h2> {/* 한국어 질문 텍스트 표시 */}
                   {/* TODO: 다른 언어 텍스트도 표시하려면 여기에 추가 */}
                   {/* <p>{currentQuestion.text_en}</p> */}
                </div>
              </div>

              {/* 답변 선택 옵션 (7개 버튼) 가로 배치 컨테이너 */}
              <div className={styles.horizontalAnswerOptionsContainer}>
                {/* 7개 버튼 렌더링 (7부터 1까지 역순으로 순회) */}
                {[7, 6, 5, 4, 3, 2, 1].map((value) => {
                  // 현재 버튼 값에 해당하는 라벨 데이터 가져오기
                  const label = scaleLabels[value - 1]; // value 1은 scaleLabels[0], value 7은 scaleLabels[6]

                  // 버튼 색상 클래스 적용
                  const buttonColorClass = getButtonColorClass(value);

                  // **** Button text with line breaks ****
                  const buttonTextKo = label.ko;
                  let displayButtonText;

                  // Apply line breaks for specific labels
                  if (buttonTextKo === "매우 그렇다") {
                      displayButtonText = (
                          <>
                              매우 <br /> 그렇다
                          </>
                      );
                  } else if (buttonTextKo === "약간 그렇다") {
                       displayButtonText = (
                          <>
                              조금 <br /> 그렇다
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
                              조금 <br /> 아니다
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
                      // Display other labels (그렇다, 아니다) without line breaks
                      displayButtonText = buttonTextKo;
                  }
                  // **********************************


                  return (
                    // Individual answer button
                    <button
                      key={value} // React 리스트 렌더링을 위한 고유 key
                      onClick={() => handleAnswerSelect(value)} // 버튼 클릭 시 handleAnswerSelect 함수 호출
                      // CSS 클래스 적용: 기본 스타일, 색상 클래스, 선택 상태 클래스
                      className={`${styles.answerButton} ${buttonColorClass} ${selectedAnswer === value ? styles.selected : ''}`}
                    >
                        {/* Display button text (with line breaks applied) */}
                        {displayButtonText}
                    </button>
                  );
                })}
              </div>

              {/* TODO: Consider adding progress bar, previous button, etc. */}

            </div>
        </>
      );
  }

  // UI displayed briefly after answering all questions before automatically navigating to the results page
  // (May appear during the setTimeout delay in the handleAnswerSelect function)
  return (
      <>
        {/* Set Page Title */}
        <Head>
            <title>MBCO TEST - Processing...</title>
            <meta name="description" content="Processing MBCO Test Results" />
            {/* Add favicon and other necessary metadata */}
        </Head>
        {/* Container to display results processing message */}
        <div className={styles.completionContainer}> {/* Reuse completionContainer style */}
            <h1>Processing Results...</h1>
            <p>결과를 계산하고 페이지를 이동합니다.</p>
        </div>
      </>
  );
}

export default TestPage; // Set the component as the default export.
