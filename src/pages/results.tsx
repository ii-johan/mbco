// my-embico-app/src/pages/results.tsx (수정: 백분율 계산 범위 7점 척도로 변경)

import React, { useEffect, useState } from 'react';
import styles from './results.module.css';
import { useRouter } from 'next/router';

interface Scores {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
  AB: number;
  HL: number;
}

const dimensionFullNames: { [key: string]: { [key: string]: string } } = {
    EI: { E: 'Extraversion', I: 'Introversion' },
    SN: { S: 'Sensing', N: 'iNtuition' },
    TF: { T: 'Thinking', F: 'Feeling' },
    JP: { J: 'Judging', P: 'Perceiving' },
    AB: { A: 'Assertiveness', B: 'Boldness' },
    HL: { H: 'Honesty', L: 'Liberality' },
};

const getResultTypeLetter = (score: number, dimension: 'EI' | 'SN' | 'TF' | 'JP' | 'AB' | 'HL'): string => {
  if (dimension === 'JP') return score > 0 ? 'J' : 'P';
  if (dimension === 'EI') return score > 0 ? 'E' : 'I';
  if (dimension === 'SN') return score > 0 ? 'N' : 'S';
  if (dimension === 'TF') return score > 0 ? 'T' : 'F';
  if (dimension === 'AB') return score > 0 ? 'A' : 'B';
  if (dimension === 'HL') return score > 0 ? 'H' : 'L';

  return '';
};

const getFinalTypeString = (scores: Scores): string => {
    const ei = getResultTypeLetter(scores.EI, 'EI');
    const sn = getResultTypeLetter(scores.SN, 'SN');
    const tf = getResultTypeLetter(scores.TF, 'TF');
    const jp = getResultTypeLetter(scores.JP, 'JP');
    const ab = getResultTypeLetter(scores.AB, 'AB');
    const hl = getResultTypeLetter(scores.HL, 'HL');

    return `${ei}${sn}${tf}${jp}-${ab}${hl}`;
};


// **** 각 지표별 백분율을 계산하는 함수 (수정: 7점 척도 범위 반영) ****
const calculatePercentage = (score: number): number => {
    // **** 7점 척도 기반으로 점수 범위 변경: 12개 질문 x (-3 ~ +3) = -36 ~ +36 ****
    const minScore = -36;
    const maxScore = 36;
    const range = maxScore - minScore; // 72

    const percentage = ((score - minScore) / range) * 100;

    // 소수점 첫째 자리까지 반올림 -> 정수로 반올림으로 변경
    return Math.round(percentage); // 소수점 제거
};
// ***********************************************************


function ResultsPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [finalType, setFinalType] = useState<string | null>(null);
  const [percentages, setPercentages] = useState<{ [key: string]: number } | null>(null);


  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { scores: scoresQueryParam } = router.query;

    if (scoresQueryParam) {
      try {
        const parsedScores: Scores = JSON.parse(scoresQueryParam as string);
        setScores(parsedScores);

        const typeString = getFinalTypeString(parsedScores);
        setFinalType(typeString);

        const calculatedPercentages: { [key: string]: number } = {
          EI: calculatePercentage(parsedScores.EI),
          SN: calculatePercentage(parsedScores.SN),
          TF: calculatePercentage(parsedScores.TF),
          JP: calculatePercentage(parsedScores.JP),
          AB: calculatePercentage(parsedScores.AB),
          HL: calculatePercentage(parsedScores.HL),
        };
        setPercentages(calculatedPercentages);


      } catch (error) {
        console.error("ResultsPage: Error processing scores:", error);
        setLoadingError("결과 데이터를 처리하는데 오류가 발생했습니다.");
      }
    } else {
      console.warn("ResultsPage: No scores found in query parameter.");
      setLoadingError("점수 데이터가 없습니다. 검사를 다시 진행해주세요.");
    }

  }, [router.isReady, router.query]);


   if (!scores && !loadingError && !finalType) {
       return (
           <div className={styles.container || ''} style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
              <h1>Loading Results...</h1>
              <p>결과 데이터를 불러오고 있습니다.</p>
               { !styles.container && <style>{` body { background-color: black; color: white; text-align: center; margin-top: 50px; } `}</style>}
           </div>
       );
   }

  if (loadingError) {
      return (
           <div className={styles.container || ''} style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
              <h1>Error Loading Results</h1>
              <p>{loadingError}</p>
               { !styles.container && <style>{` body { background-color: black; color: red; text-align: center; margin-top: 50px; } `}</style>}
                <button onClick={() => router.push('/')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                    홈으로 돌아가기
                </button>
          </div>
      );
  }

  return (
    <div className={styles.container}>
      <h1>My EMCO Type?</h1>

      {finalType && (
        <div className={styles.finalType}>
          {finalType}
        </div>
      )}

      {scores && percentages && (
        <div className={styles.dimensionResults}>

           {/* MBTI 지표 결과 박스 */}
           <div className={styles.resultBox}>
                <h2>MBTI</h2>
               {/* EI, SN, TF, JP 순서로 표시 */}
               {/* 새로운 표기 형식 반영: E(Extraversion)80% */}
               <p>{getResultTypeLetter(scores.EI, 'EI')}({dimensionFullNames.EI[getResultTypeLetter(scores.EI, 'EI')]}){percentages.EI}%</p>
                <p>{getResultTypeLetter(scores.SN, 'SN')}({dimensionFullNames.SN[getResultTypeLetter(scores.SN, 'SN')]}){percentages.SN}%</p>
                <p>{getResultTypeLetter(scores.TF, 'TF')}({dimensionFullNames.TF[getResultTypeLetter(scores.TF, 'TF')]}){percentages.TF}%</p>
               <p>{getResultTypeLetter(scores.JP, 'JP')}({dimensionFullNames.JP[getResultTypeLetter(scores.JP, 'JP')]}){percentages.JP}%</p>
           </div>


           {/* HEXACO 지표 결과 박스 */}
            <div className={styles.resultBox}>
                 <h2>HEXACO</h2>
               {/* AB, HL 순서로 표시 */}
               <p>{getResultTypeLetter(scores.AB, 'AB')}({dimensionFullNames.AB[getResultTypeLetter(scores.AB, 'AB')]}){percentages.AB}%</p>
               <p>{getResultTypeLetter(scores.HL, 'HL')}({dimensionFullNames.HL[getResultTypeLetter(scores.HL, 'HL')]}){percentages.HL}%</p>
            </div>

           {/* 나중에 전체 유형에 대한 설명 텍스트 추가 */}
           {/* <div className={styles.overallExplanation}> ... </div> */}


        </div>
      )}

       {/* 홈으로 돌아가기 버튼 등 */}
       <button onClick={() => router.push('/')} className={styles.retryButton}>
           홈으로 돌아가기
       </button>

       {/* 디버깅용 raw 데이터 표시 (주석 처리 또는 삭제 가능) */}
       {/* <div style={{ marginTop: '40px', color: '#aaa', textAlign: 'left' }}>
            <h3>Raw Scores:</h3>
            <pre style={{ color: 'lightgreen', textAlign: 'left', maxWidth: '90%', overflowX: 'auto' }}>
              {JSON.stringify(scores, null, 2)}
            </pre>
       </div> */}

    </div>
  );
}

export default ResultsPage;