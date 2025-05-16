// my-embico-app/src/pages/results.tsx (제목 수정본)

import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // Next.js의 Head 컴포넌트 임포트
import { useRouter } from 'next/router'; // Next.js 라우터 임포트

import styles from './results.module.css'; // CSS 모듈 임포트

// --- 기존 인터페이스 및 헬퍼 함수들은 이전 답변과 동일 ---
interface Scores {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
  AB: number;
  HL: number;
  // O?: number; // Optional
  // C?: number; // Optional
  // EM?: number; // Optional
}

interface MaxStrengths {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
  AB: number;
  HL: number;
  // O?: number;
  // C?: number;
  // EM?: number;
}

const dimensionFullNames: { [key: string]: { [key: string]: string } } = {
  EI: { E: 'Extraversion', I: 'Introversion' },
  SN: { S: 'Sensing', N: 'iNtuition' },
  TF: { T: 'Thinking', F: 'Feeling' },
  JP: { J: 'Judging', P: 'Perceiving' },
  AB: { A: 'Assertiveness', B: 'Boldness' },
  HL: { H: 'Honesty', L: 'Liberality' },
  // O: { O: 'Openness', C: 'Closedness' },
  // C: { C: 'Conscientiousness', U: 'Unconscientiousness' },
  // EM: { E: 'Emotional', M: 'Calm' }, // EM의 M은 Calm을 의미한다고 가정
};

const getResultTypeLetter = (score: number, dimension: keyof Scores): string => {
  if (score === 0) {
    switch (dimension) {
      case 'EI': return 'E/I';
      case 'SN': return 'S/N';
      case 'TF': return 'T/F';
      case 'JP': return 'J/P';
      case 'AB': return 'A/B';
      case 'HL': return 'H/L';
      // case 'O': return 'O/C';
      // case 'C': return 'C/U';
      // case 'EM': return 'E/M';
      default: return '';
    }
  }
  switch (dimension) {
    case 'EI': return score > 0 ? 'E' : 'I';
    case 'SN': return score > 0 ? 'N' : 'S'; // N이 양수, S가 음수
    case 'TF': return score > 0 ? 'T' : 'F';
    case 'JP': return score > 0 ? 'J' : 'P';
    case 'AB': return score > 0 ? 'A' : 'B';
    case 'HL': return score > 0 ? 'H' : 'L';
    // case 'O': return score > 0 ? 'O' : 'C';
    // case 'C': return score > 0 ? 'C' : 'U';
    // case 'EM': return score > 0 ? 'E' : 'M';
    default: return '';
  }
};

const calculatePercentage = (score: number, maxPossibleScore: number): { percentNegativePole: number, percentPositivePole: number } => {
  if (maxPossibleScore <= 0) {
    return { percentNegativePole: 50, percentPositivePole: 50 };
  }
  const normalizedScore = score + maxPossibleScore;
  const percentageTowardsPositivePole = Math.round((normalizedScore / (2 * maxPossibleScore)) * 100);
  return {
    percentNegativePole: 100 - percentageTowardsPositivePole,
    percentPositivePole: percentageTowardsPositivePole,
  };
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

// --- 컴포넌트 시작 ---
function ResultsPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores | null>(null);
  const [maxStrengths, setMaxStrengths] = useState<MaxStrengths | null>(null);
  const [message, setMessage] = useState<string>('결과 데이터를 불러오는 중입니다...');
  const [finalType, setFinalType] = useState<string | null>(null);
  const [dimensionDisplayResults, setDimensionDisplayResults] = useState<
    {
      dimension: keyof Scores;
      dominantTraitLetter: string;
      dominantTraitFullName: string;
      dominantPercentage: number | null;
    }[] | null
  >(null);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { scores: scoresQueryParam, maxStrengths: maxStrengthsQueryParam } = router.query;

    if (scoresQueryParam && maxStrengthsQueryParam) {
      try {
        const parsedScores: Scores = JSON.parse(scoresQueryParam as string);
        const parsedMaxStrengths: MaxStrengths = JSON.parse(maxStrengthsQueryParam as string);

        setScores(parsedScores);
        setMaxStrengths(parsedMaxStrengths);
        setMessage('');

        const typeString = getFinalTypeString(parsedScores);
        setFinalType(typeString);

        const displayResults: typeof dimensionDisplayResults = [];
        const dimensionsOrder: (keyof Scores)[] = ['EI', 'SN', 'TF', 'JP', 'AB', 'HL'];

        dimensionsOrder.forEach(dimension => {
          if (parsedScores[dimension] === undefined || parsedMaxStrengths[dimension] === undefined) {
            return;
          }

          const score = parsedScores[dimension];
          const maxStrength = parsedMaxStrengths[dimension];

          let positivePoleLetter = '';
          let negativePoleLetter = '';

          switch (dimension) {
            case 'EI': positivePoleLetter = 'E'; negativePoleLetter = 'I'; break;
            case 'SN': positivePoleLetter = 'N'; negativePoleLetter = 'S'; break;
            case 'TF': positivePoleLetter = 'T'; negativePoleLetter = 'F'; break;
            case 'JP': positivePoleLetter = 'J'; negativePoleLetter = 'P'; break;
            case 'AB': positivePoleLetter = 'A'; negativePoleLetter = 'B'; break;
            case 'HL': positivePoleLetter = 'H'; negativePoleLetter = 'L'; break;
          }

          const { percentNegativePole, percentPositivePole } = calculatePercentage(score, maxStrength);

          let dominantTraitLetterResult: string;
          let dominantTraitFullNameResult = '';
          let percentageToDisplay: number | null = null;

          if (score === 0) {
            dominantTraitLetterResult = getResultTypeLetter(score, dimension);
            dominantTraitFullNameResult = 'Neutral';
            percentageToDisplay = null;
          } else if (score > 0) {
            dominantTraitLetterResult = positivePoleLetter;
            percentageToDisplay = percentPositivePole;
            dominantTraitFullNameResult = dimensionFullNames[dimension]?.[dominantTraitLetterResult] || dominantTraitLetterResult;
          } else { // score < 0
            dominantTraitLetterResult = negativePoleLetter;
            percentageToDisplay = percentNegativePole;
            dominantTraitFullNameResult = dimensionFullNames[dimension]?.[dominantTraitLetterResult] || dominantTraitLetterResult;
          }

          displayResults.push({
            dimension,
            dominantTraitLetter: dominantTraitLetterResult,
            dominantTraitFullName: dominantTraitFullNameResult,
            dominantPercentage: percentageToDisplay,
          });
        });
        setDimensionDisplayResults(displayResults);

      } catch (error) {
        console.error("ResultsPage: Error processing data:", error);
        setMessage("결과 데이터를 처리하는데 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      console.warn("ResultsPage: Missing scores or maxStrengths in query parameter.");
      setMessage("결과 데이터가 없습니다. 검사를 다시 진행해주세요.");
    }
  }, [router.isReady, router.query]);

  if (!scores || !maxStrengths || !dimensionDisplayResults || dimensionDisplayResults.length === 0) {
    return (
      <div className={styles.completionContainer}>
        <h1>{message.includes('오류') || message.includes('없습니다') ? '알림' : '로딩 중'}</h1>
        <p>{message}</p>
        {(message.includes('오류') || message.includes('없습니다')) && (
          <button onClick={() => router.push('/')} className={styles.resultButton}>
            홈으로 돌아가기
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        {/* 브라우저 탭 제목 수정 */}
        <title>My MBCO Type - Results</title>
        <meta name="description" content="MBCO Personality Test Results (MBTI + HEXACO)" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* 페이지 상단 제목 수정 */}
      <h1 className={styles.pageTitle}>My MBCO Type?</h1>

      {finalType && (
        <div className={styles.finalType}>
          {finalType}
        </div>
      )}

      <div className={styles.dimensionResultsContainer}>
        {dimensionDisplayResults.map((result) => (
          <div key={result.dimension} className={styles.dimensionItem}>
            {result.dominantPercentage !== null ? (
              <>
                <span className={styles.dimensionLabel}>
                  {result.dominantTraitLetter} ({result.dominantTraitFullName})
                </span>
                <span className={styles.dimensionPercentage}>
                  {result.dominantPercentage}%
                </span>
              </>
            ) : (
              <span className={styles.dimensionLabelNeutral}>
                {result.dominantTraitLetter} ({result.dominantTraitFullName})
              </span>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => router.push('/')} className={styles.retryButton}>
        다시 검사하기 / 홈으로
      </button>

    </div>
  );
}

export default ResultsPage;