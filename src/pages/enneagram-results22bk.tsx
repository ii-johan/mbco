// pages/enneagram-results.tsx 파일

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './enneagram-results.module.css'; // 결과 페이지 CSS 모듈 임포트

// TODO: 에니어그램 유형별 이름 매핑 데이터 (예: 1: 'The Reformer, 원칙주의자') 필요
// 예시 데이터 구조 (실제 에니어그램 정보에 맞게 확장 필요)
const enneagramTypeNames: { [key: number]: { en: string; ko: string } } = {
    1: { en: 'The Reformer', ko: '원칙주의자' },
    2: { en: 'The Helper', ko: '이타주의자' },
    3: { en: 'The Achiever', ko: '성취주의자' },
    4: { en: 'The Individualist', ko: '개성주의자' },
    5: { en: 'The Investigator', ko: '탐구주의자' },
    6: { en: 'The Loyalist', ko: '충성주의자' },
    7: { en: 'The Enthusiast', ko: '낙천주의자' },
    8: { en: 'The Challenger', ko: '도전주의자' },
    9: { en: 'The Peacemaker', ko: '평화주의자' },
};


// 유형별 점수를 바탕으로 기본 유형과 날개 유형을 판별하는 함수
const calculatePrimaryAndWing = (scores: { [type: number]: number }) => {
    // 점수 객체를 [유형 번호, 점수] 형태의 배열로 변환하고 점수가 높은 순서로 정렬합니다.
    const sortedScores = Object.entries(scores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    // 가장 높은 점수를 받은 유형이 기본 유형입니다.
    const primaryType = sortedScores.length > 0 ? parseInt(sortedScores[0][0], 10) : null; // 문자열 키를 숫자로 변환

    let wingType: number | null = null;

    // 기본 유형이 판별되었다면 날개 유형을 판별합니다.
    if (primaryType !== null) {
        // 기본 유형의 인접 유형 번호를 찾습니다.
        const adjacentTypes = [];
        if (primaryType === 1) {
            adjacentTypes.push(9, 2); // 1번 유형의 인접은 9번, 2번
        } else if (primaryType === 9) {
             adjacentTypes.push(8, 1); // 9번 유형의 인접은 8번, 1번
        } else {
            adjacentTypes.push(primaryType - 1, primaryType + 1); // 그 외 유형은 -1, +1
        }

        // 인접 유형들의 점수를 가져옵니다.
        const adjacentScores = adjacentTypes
            .map(type => ({ type: type, score: scores[type] || 0 })) // 점수가 없을 수 있으므로 기본값 0
            .sort((a, b) => b.score - a.score); // 점수가 높은 순서로 정렬

        // 인접 유형 중 점수가 더 높은 유형이 날개 유형입니다.
        if (adjacentScores.length > 0) {
            wingType = adjacentScores[0].type;
             // TODO: 날개 판별에 대한 더 정교한 로직이 필요할 수 있습니다. (예: 점수 차이 임계값)
        }
    }

    // TODO: 성격 건강 수준 (Level of Development) 판별 로직 추가 필요
    // 현재는 임시로 'Average'로 설정
    const developmentLevel = 'Average'; // 임시 건강 수준

    return {
        primaryType: primaryType,
        wingType: wingType,
        developmentLevel: developmentLevel, // 판별된 건강 수준
        allTypeScores: sortedScores // 모든 유형 점수 (높은 순서로 정렬)
    };
};


// EnneagramResultsPage 함수형 컴포넌트
function EnneagramResultsPage() {
  const router = useRouter();
  // 넘겨받은 점수를 저장할 상태 변수 (typeScores는 이제 계산에 사용)
  // const [typeScores, setTypeScores] = useState<{ [type: number]: number } | null>(null); // 이제 이 상태는 필요 없을 수 있음

  // 최종 결과 (기본 유형, 날개, 건강 수준, 모든 점수)를 저장할 상태 변수
  const [finalResult, setFinalResult] = useState<{
      primaryType: number | null;
      wingType: number | null;
      developmentLevel: string | null;
      allTypeScores: [string, number][]; // [유형 번호(문자열), 점수] 배열
      // 기타 필요 정보 (예: 유형별 이름 등)
  } | null>(null);


  // 컴포넌트가 마운트되거나 router.query가 변경될 때 실행
  useEffect(() => {
      const scoresQuery = router.query.scores;

      if (scoresQuery && typeof scoresQuery === 'string') {
          try {
              const parsedScores = JSON.parse(scoresQuery);

              if (typeof parsedScores === 'object' && parsedScores !== null) {
                  // ** 받은 점수를 바탕으로 최종 결과 (기본 유형, 날개 등)를 계산합니다. **
                  const calculatedResult = calculatePrimaryAndWing(parsedScores);

                  // 계산된 최종 결과를 상태 변수에 저장합니다.
                  setFinalResult(calculatedResult);

                  console.log("Final Enneagram Result:", calculatedResult); // 콘솔에서 최종 결과 확인

              } else {
                  console.error("받은 점수 데이터 형식이 올바르지 않습니다.");
                  // 오류 처리 또는 홈으로 리다이렉트 고려
              }
          } catch (error) {
              console.error("점수 데이터 파싱 중 오류 발생:", error);
               // 오류 처리 또는 홈으로 리다이렉트 고려
          }
      } else {
          console.warn("결과 점수 데이터가 없습니다. 테스트 페이지를 통해 접근해주세요.");
          // TODO: 점수 데이터 없이 결과 페이지에 접근한 경우 처리 (예: 홈으로 리다이렉트)
           // if (!finalResult) { // 아직 결과가 설정되지 않았다면
           //    router.push('/enneagram-test'); // 테스트 시작 페이지로 이동
           // }
      }
  }, [router.query]); // router.query 값이 변경될 때마다 이펙트 실행

  // TODO: 로딩 상태 또는 데이터 없을 경우 처리 UI 추가
  if (!finalResult) {
       // 결과 데이터가 아직 로드되거나 계산되지 않은 경우
       return (
           <div className={styles.container}>
               <h1>결과 로딩 중...</h1>
               <p>테스트 결과를 계산하는 중입니다.</p>
               {/* 데이터 로드/계산 실패 시 메시지 표시 등 */}
               {/* TODO: 홈으로 돌아가는 버튼 */}
           </div>
       );
  }

  // 최종 결과 (finalResult)를 사용하여 화면을 표시합니다.
  // 요청하신 형식대로 표시합니다.
   const { primaryType, wingType, developmentLevel, allTypeScores } = finalResult;

   // 유형 이름 가져오기 (존재하지 않는 유형 번호에 대한 처리 추가)
   const primaryTypeName = primaryType ? enneagramTypeNames[primaryType]?.ko || `유형 ${primaryType}` : '?';

   // 간략 결과 문자열 생성 (예: 1-W2-Average)
   const summarizedResult = `${primaryType !== null ? primaryType : '?'}-W${wingType !== null ? wingType : '?'}-${developmentLevel || '?'}`;

   // 점수 목록 표시를 위해 상위 점수만 추출 (예: 상위 3개)
   const topScoresToDisplay = allTypeScores.slice(0, 3); // 상위 3개만 표시

  return (
    <>
      {/* 페이지 Head 설정 */}
      <Head>
        <title>My Enneagram Result</title>
        <meta name="description" content={`My Enneagram Type is ${summarizedResult}`} />
      </Head>

      {/* 결과 페이지 컨테이너 */}
      <div className={styles.container}>
        {/* 메인 질문 제목 */}
        <h1 className={styles.mainTitle}>My Enneagram Type?</h1>

        {/* 간략 결과 표기 */}
        <div className={styles.summarizedResult}>
            {/* 계산된 간략 결과 문자열 표시 */}
            {summarizedResult}
        </div>

        {/* 세부 설명 노란색 박스 */}
        <div className={styles.detailsBox}>
            <h2>상세 결과</h2>
            {/* 기본 유형 설명 */}
            {primaryType !== null && (
                 <p>당신의 기본유형(Primary Type)은 {primaryType}번({primaryTypeName})입니다.</p>
            )}

            {/* 날개 유형 설명 */}
            {wingType !== null && (
                 <p>당신의 날개유형(Wing Type)은 {wingType}번입니다.</p>
            )}

            {/* 성격 건강 수준 설명 */}
             {developmentLevel && (
                <p>당신의 성격건강수준(Level of Development)은 {developmentLevel}({developmentLevel === 'Average' ? '보통' : '알 수 없음'})입니다.</p> // 임시로 보통/알수없음 표시
             )}


            {/* 상위 점수 표시 */}
            <p>당신의 점수는 다음과 같이 나왔습니다:</p>
            <ul>
                 {/* 상위 점수 목록을 순회하며 표시 */}
                 {topScoresToDisplay.map(([type, score]) => (
                     <li key={type}>{type}번 ({score}점)</li>
                 ))}
                 {/* TODO: 모든 유형 점수 표시 필요시 allTypeScores.map 사용 */}
            </ul>

             {/* TODO: 유형별 세부 설명 등 추가 내용 (별도 데이터 필요) */}
             {/* <p>유형 {primaryType} 특징:</p> */}
             {/* <p>날개 {wingType} 영향:</p> */}

        </div>

        {/* TODO: 필요하다면 홈으로 돌아가기 버튼 등 추가 */}
         {/* <button onClick={() => router.push('/')} className={styles.homeButton}>홈으로 돌아가기</button> */}

      </div>
    </>
  );
}

// EnneagramResultsPage 컴포넌트를 기본 내보내기로 설정합니다.
export default EnneagramResultsPage;

// enneagramTypeNames, calculatePrimaryAndWing 함수는 파일 상단, 컴포넌트 정의 전에 있어야 합니다.