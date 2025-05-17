// src/pages/enneagram-test.tsx

import React, { useState, useEffect } from 'react'; // 필요한 훅 임포트: useState, useEffect
import Head from 'next/head';
import { useRouter } from 'next/router'; // useRouter 훅 임포트
import styles from './test.module.css'; // MBCO 테스트의 CSS 모듈 임포트 (동일 폴더)

// 에니어그램 테스트 문항 데이터 및 타입 임포트
import { enneagramQuestions, EnneagramQuestion } from '../data/enneagramData';

// 7점 척도 라벨 데이터 (컴포넌트 바깥에 정의)
const scaleLabels = [
  { ko: "No++", ja: "全く違う", zh: "非常不同意", en: "Strongly Disagree" },   // 값 1
  { ko: "No+",  ja: "違う",    zh: "不同意",   en: "Disagree" },           // 값 2
  { ko: "No",   ja: "やや違う", zh: "有点不同意", en: "Slightly Disagree" }, // 값 3
  { ko: "Mid",  ja: "分からない", zh: "不确定",    en: "Neutral" },           // 값 4
  { ko: "Yes",  ja: "ややそうだ", zh: "有点同意",  en: "Slightly Agree" },    // 값 5
  { ko: "Yes+", ja: "そうだ",    zh: "同意",      en: "Agree" },           // 값 6
  { ko: "Yes++",ja: "非常にそうだ", zh: "非常同意",  en: "Strongly Agree" },    // 값 7
];

// 버튼 값 (1~7)에 따라 CSS 클래스를 반환하는 함수 (컴포넌트 바깥에 정의)
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

// 사용자 답변과 문항 데이터를 바탕으로 에니어그램 유형별 점수를 계산하는 함수 (컴포넌트 바깥에 정의)
// 이 함수는 enneagramData.ts의 scoring 정보를 사용하여 점수를 계산합니다.
const calculateEnneagramScores = (
  userAnswers: { questionId: number; answer: number }[],
  questions: EnneagramQuestion[]
): { [type: number]: number } => {
  const scores: { [type: number]: number } = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };

  userAnswers.forEach(userAnswer => {
    const question = questions.find(q => q.id === userAnswer.questionId);

    if (question && question.scoring) {
      question.scoring.forEach(scoreInfo => {
        const type = scoreInfo.type;
        const polarity = scoreInfo.polarity;
        // const weight = scoreInfo.weight ?? 1; // 가중치가 있다면 사용

        const answerValue = userAnswer.answer;
        let scoreContribution = 0;

        // polarity에 따라 점수 기여도를 계산합니다.
        if (polarity === 'positive') {
          scoreContribution = answerValue; // 1-7점 그대로 반영
        } else if (polarity === 'negative') {
          scoreContribution = (7 - answerValue) + 1; // 척도 반전 (1->7, 7->1)
        }

        // TODO: 사용자 테스트의 실제 채점 방식이 다르다면 이 계산 로직을 수정해야 합니다.
        // 예: 4점을 기준으로 -3 ~ +3 변환 등

        if (scores[type] !== undefined) {
          scores[type] += scoreContribution; // * weight; // 가중치가 있다면 weight 곱하기
        }
      });
    }
  });

  return scores;
};


// EnneagramTestPage 함수 컴포넌트 정의 시작
function EnneagramTestPage() {
  // ***** 상태 변수 선언 (컴포넌트 안에 있어야 함) *****
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; answer: number }[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 오류 상태 추가


  // ***** useRouter 훅 호출 (컴포넌트 안에 있어야 함) *****
  const router = useRouter();

  // ***** 문항 데이터 로딩 (필요하다면 useEffect 사용 - 현재는 즉시 임포트) *****
  // enneagramQuestions 데이터는 파일 상단에서 임포트되므로 여기서 다시 로드할 필요는 없습니다.
  // 다만 데이터 로딩에 시간이 걸리거나 비동기 로딩이 필요하다면 useEffect를 사용합니다.
  // 현재는 즉시 사용 가능하다고 가정합니다.


  // ***** 현재 문항 데이터 가져오기 *****
  // enneagramQuestions 배열이 비어있지 않고 currentQuestionIndex가 유효한 범위일 때만 가져옵니다.
  const currentQuestion = enneagramQuestions && enneagramQuestions.length > currentQuestionIndex
      ? enneagramQuestions[currentQuestionIndex]
      : null; // 데이터 로딩 전이나 오류 시 null


  // ***** handleAnswerSelect 함수 정의 (컴포넌트 안에 있어야 함) *****
  // 이 함수 전체를 EnneagramTestPage 함수 안에 넣습니다.
  const handleAnswerSelect = (answerValue: number) => {
    setSelectedAnswer(answerValue); // 상태 변경

    // 사용자의 답변을 저장하는 로직
     const newUserAnswer = {
      questionId: currentQuestion ? currentQuestion.id : -1, // 문항 없을 경우 -1
      answer: answerValue,
     };
     // userAnswers 상태 업데이트 (이전 답변 + 새 답변)
     const updatedAnswers = [...userAnswers, newUserAnswer];
     setUserAnswers(updatedAnswers); // 답변 상태 업데이트 (React는 상태 업데이트 후 즉시 반영되지 않을 수 있음)


    console.log(`Question ${currentQuestion ? currentQuestion.id : 'N/A'} Answered: ${answerValue}`);


    // 다음 문항으로 이동 또는 테스트 완료 처리
    if (currentQuestionIndex < enneagramQuestions.length - 1) {
      setTimeout(() => { // 선택 효과를 잠시 보여준 후 다음 문항으로 이동
        setCurrentQuestionIndex(prevIndex => prevIndex + 1); // 다음 문항 인덱스로 상태 변경
        setSelectedAnswer(null); // 선택 상태 초기화
      }, 300); // 0.3초 지연
    } else {
      // ***** 90문항 완료 후 처리: 점수 계산 및 결과 페이지 이동 *****
      console.log("Enneagram Test Completed!");
      console.log("User Answers:", updatedAnswers); // 임시로 최종 답변 확인

      // 1. 사용자 답변을 바탕으로 9가지 에니어그램 유형별 점수를 계산합니다.
       // calculateEnneagramScores 함수는 컴포넌트 밖에 정의되어 있으므로 여기서 호출 가능
      const typeScores = calculateEnneagramScores(updatedAnswers, enneagramQuestions);
      console.log("Calculated Scores:", typeScores); // 계산된 점수 확인 (콘솔)

      // 2. 결과 페이지로 넘겨줄 데이터를 준비합니다. (점수 객체)
      const resultDataForQuery = JSON.stringify(typeScores);

      // 3. 결과 페이지로 이동하며, 쿼리 파라미터에 점수 데이터를 담아 넘깁니다.
       // router 객체는 컴포넌트 안에 있으므로 여기서 사용 가능
      router.push({
            pathname: '/enneagram-results', // 이동할 페이지 경로
            query: { scores: resultDataForQuery } // 'scores' 라는 이름으로 점수 데이터를 넘김
        });

        // TODO: 결과 페이지에서 이 'scores' 데이터를 받아 에니어그램 최종 결과 계산 및 표시
    }
  };


  // ***** 로딩 및 오류 상태에 따른 UI 표시 *****
  // 문항 데이터가 아직 로드되지 않았거나 오류가 발생한 경우
   if (!currentQuestion && enneagramQuestions.length > 0) {
       // 데이터는 있는데 currentQuestion이 null이면 인덱스 오류 가능성
       return (
           <div className={styles.completionContainer}>
               <h1>테스트 표시 오류</h1>
               <p>문항을 표시하는 데 문제가 발생했습니다. 인덱스를 확인해주세요.</p>
                {/* TODO: 홈으로 돌아가는 버튼 */}
           </div>
       );
   }

   if (!enneagramQuestions || enneagramQuestions.length === 0) {
        // 문항 데이터 자체가 비어있거나 로드 실패한 경우 (calculateEnneagramScores 함수 정의보다 위에 import 확인)
        return (
           <div className={styles.completionContainer}>
               <h1>테스트 준비 중</h1>
               <p>테스트 문항 데이터를 불러오는 중 오류가 발생했거나 데이터가 비어있습니다.</p>
               <p>src/data/enneagramData.ts 파일 확인이 필요합니다.</p>
                {/* TODO: 홈으로 돌아가는 버튼 */}
           </div>
       );
   }


  // ***** 컴포넌트 렌더링 부분 (JSX) *****
  // 현재 문항이 유효할 때만 테스트 UI를 보여줍니다.
  if (currentQuestion) {
      return (
        <>
          {/* 페이지 Head 설정 */}
          <Head>
            <title>{`Enneagram Test - Question ${currentQuestionIndex + 1}`}</title>
            <meta name="description" content={`Enneagram Test Question ${currentQuestionIndex + 1}`} />
          </Head>

          {/* 테스트 페이지 컨테이너 */}
          <div className={styles.container}>
            {/* 질문 영역 */}
            <div className={styles.questionArea}>
              {/* 문항 번호 표시 */}
              <h1>질문 {currentQuestionIndex + 1} / {enneagramQuestions.length}</h1>
              {/* 질문 내용 박스 */}
              <div className={styles.questionBox}>
                <h2>{currentQuestion.text_ko}</h2>
              </div>
            </div>

            {/* 답변 선택 옵션 컨테이너 */}
            <div className={styles.answerOptionsContainer}>
              {/* 7개의 답변 버튼 렌더링 */}
              {[7, 6, 5, 4, 3, 2, 1].map((value) => {
                const label = scaleLabels[value - 1];
                const buttonColorClass = getButtonColorClass(value);

                return (
                  <button
                    key={value}
                    onClick={() => handleAnswerSelect(value)}
                    className={`${styles.answerButton} ${buttonColorClass} ${selectedAnswer === value ? styles.selected : ''}`}
                  >
                    {label.ko}
                  </button>
                );
              })}
            </div>

            {/* TODO: 필요하다면 여기에 문항 진행 상태 표시줄 등 추가 */}

          </div>
        </>
      );
  }

  // currentQuestion이 null이고 enneagramQuestions도 비어있다면 위에서 이미 처리됨
  // 여기에 도달하는 경우는 거의 없겠지만, 혹시 모를 상황을 대비
  return (
      <div className={styles.completionContainer}>
          <h1>테스트 상태 이상</h1>
          <p>페이지 로딩 또는 문항 데이터 처리에 예상치 못한 문제가 발생했습니다.</p>
           {/* TODO: 홈으로 돌아가는 버튼 */}
      </div>
  );

} // EnneagramTestPage 함수 컴포넌트 정의 끝

// EnneagramTestPage 컴포넌트를 기본 내보내기로 설정합니다. (파일 맨 마지막)
export default EnneagramTestPage;

// scaleLabels와 getButtonColorClass는 파일 상단, calculateEnneagramScores 정의 앞에 있어야 합니다.