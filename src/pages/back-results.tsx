// my-embico-app/src/pages/results.tsx (수정본 - 백분율 오류 및 표시 방식 개선 로직 포함)

import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // Next.js의 Head 컴포넌트 임포트
import { useRouter } from 'next/router'; // Next.js 라우터 임포트

import styles from './results.module.css'; // CSS 모듈 임포트

// 점수 데이터 타입 정의 (test.tsx에서 전달받는 형식과 일치해야 합니다)
interface Scores {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
  AB: number; // AB 차원
  HL: number; // HL 차원
  // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 추가
  // O: number;
  // C: number;
  // EM: number; // 사용자 정의 EM 차원
}

// 각 차원의 최대 가능 점수 타입 정의 (test.tsx에서 전달받는 형식과 일치해야 합니다)
interface MaxStrengths {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
  AB: number;
  HL: number;
  // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 추가
  // O: number;
  // C: number;
  // EM: number; // 사용자 정의 EM 차원
}


// 차원별 전체 이름 매핑
const dimensionFullNames: { [key: string]: { [key: string]: string } } = {
    EI: { E: 'Extraversion', I: 'Introversion' },
    SN: { S: 'Sensing', N: 'iNtuition' },
    TF: { T: 'Thinking', F: 'Feeling' },
    JP: { J: 'Judging', P: 'Perceiving' },
    AB: { A: 'Assertiveness', B: 'Boldness' }, // AB 차원 전체 이름 (예시 - HEXACO의 경우 다른 의미일 수 있음)
    HL: { H: 'Honesty', L: 'Liberality' }, // HL 차원 전체 이름 (예시 - HEXACO의 경우 다른 의미일 수 있음)
    // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 전체 이름 추가
    // O: { O: 'Openness', C: 'Closedness' }, // O:+, C:- 가정
    // C: { C: 'Conscientiousness', U: 'Unconscientiousness' }, // C:+, U:- 가정
    // EM: { E: 'Emotional', C: 'Calm' }, // 사용자 정의 EM 차원 전체 이름 (예시 - E:+, C:- 가정)
};

// 각 차원의 우세 성향 문자를 결정하는 함수 (0점일 경우 중립 처리) - 최종 유형 문자열 생성 시 사용
const getResultTypeLetter = (score: number, dimension: keyof Scores): string => {
    // 점수가 0일 경우 중립을 나타내는 문자열 반환 (예: E/I, S/N 등)
    if (score === 0) {
        switch (dimension) {
            case 'EI': return 'E/I';
            case 'SN': return 'S/N';
            case 'TF': return 'T/F';
            case 'JP': return 'J/P';
            case 'AB': return (score > 0 ? 'A' : (score < 0 ? 'B' : 'A/B')); // AB 차원 중립 또는 극성
            case 'HL': return (score > 0 ? 'H' : (score < 0 ? 'L' : 'H/L')); // HL 차원 중립 또는 극성
            // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 중립 표시 추가
            // case 'O': return (score > 0 ? 'O' : (score < 0 ? 'C' : 'O/C'));
            // case 'C': return (score > 0 ? 'C' : (score < 0 ? 'U' : 'C/U'));
            // case 'EM': return (score > 0 ? 'E' : (score < 0 ? 'C' : 'E/C')); // 사용자 정의 EM 차원 중립 또는 극성

            default: return '';
        }
    }
    // 점수가 양수 또는 음수일 경우 해당 극성 문자 반환
    // EI, TF, JP는 점수 > 0 이면 E, T, J / 점수 < 0 이면 I, F, P
    // SN는 점수 > 0 이면 N / 점수 < 0 이면 S (다른 차원과 부호 반대)
    // AB는 점수 > 0 이면 A / 점수 < 0 이면 B (가정)
    // HL는 점수 > 0 이면 H / 점수 < 0 이면 L (가정)

    switch (dimension) {
        case 'EI': return score > 0 ? 'E' : 'I';
        case 'SN': return score > 0 ? 'N' : 'S';
        case 'TF': return score > 0 ? 'T' : 'F';
        case 'JP': return score > 0 ? 'J' : 'P';
        case 'AB': return score > 0 ? 'A' : 'B'; // AB 차원, A가 양수 방향이라고 가정
        case 'HL': return score > 0 ? 'H' : 'L'; // HL 차원, H가 양수 방향이라고 가정

        // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 극성 문자 반환 로직 추가
        // case 'O': return score > 0 ? 'O' : 'C'; // O가 양수 방향이라고 가정
        // case 'C': return score > 0 ? 'C' : 'U'; // C가 양수 방향이라고 가정
        // case 'EM': return score > 0 ? 'E' : 'C'; // 사용자 정의 EM 차원, E가 양수 방향이라고 가정

        default: return ''; // 알 수 없는 차원
    }
};


// 각 지표별 백분율을 계산하는 함수
// score: 해당 차원의 총점
// maxPossibleScore: 해당 차원에서 얻을 수 있는 최대 총점 절대값 (문항 수 * 3 등)
// 이 함수는 점수 범위 [-max, +max]를 백분율 범위 [0, 100]으로 변환합니다.
// -max -> 0%, 0 -> 50%, +max -> 100%
const calculatePercentage = (score: number, maxPossibleScore: number): { percentNegativePole: number, percentPositivePole: number } => {
    // maxPossibleScore가 0이거나 음수이면 계산 불가 (오류 방지)
    if (maxPossibleScore <= 0) {
        console.warn(`calculatePercentage: maxPossibleScore is invalid (${maxPossibleScore}). Returning 50/50.`);
        return { percentNegativePole: 50, percentPositivePole: 50 };
    }

    // 점수를 [0, 2*max] 범위로 정규화
    const normalizedScore = score + maxPossibleScore;

    // 정규화된 점수를 백분율 [0, 100]으로 변환
    const percentageTowardsPositivePole = Math.round((normalizedScore / (2 * maxPossibleScore)) * 100);

    // 각 극성 방향의 백분율 계산
    const percentPositivePole = percentageTowardsPositivePole; // 양수 극성 방향의 백분율 (E, N, T, J, A, H 등)
    const percentNegativePole = 100 - percentageTowardsPositivePole; // 음수 극성 방향의 백분율 (I, S, F, P, B, L 등)

    return {
        percentNegativePole,
        percentPositivePole
    };
};


// 최종 유형 문자열 (예: ENTP-AH) 생성 함수
const getFinalTypeString = (scores: Scores): string => {
    // 각 차원의 우세 성향 문자 가져오기 (0점일 경우 중립 문자 포함)
    const ei = getResultTypeLetter(scores.EI, 'EI');
    const sn = getResultTypeLetter(scores.SN, 'SN');
    const tf = getResultTypeLetter(scores.TF, 'TF');
    const jp = getResultTypeLetter(scores.JP, 'JP');
    const ab = getResultTypeLetter(scores.AB, 'AB');
    const hl = getResultTypeLetter(scores.HL, 'HL');

    // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 결과 문자 추가
    // const o = getResultTypeLetter(scores.O, 'O');
    // const c = getResultTypeLetter(scores.C, 'C');
    // const em = getResultTypeLetter(scores.EM, 'EM');

    // MBTI 4문자 + HEXACO 2문자 형식으로 조합 (예: ENTP-AH)
    // 중립일 경우 E/I, S/N 등으로 표시됩니다.
    return `${ei}${sn}${tf}${jp}-${ab}${hl}`;
    // TODO: 필요하다면 다른 HEXACO 차원 결과 문자 조합 방식 변경
    // return `${ei}${sn}${tf}${jp}-${ab}${hl}${o}${c}${em}`;
};


// 결과 페이지 컴포넌트
function ResultsPage() {
    const router = useRouter(); // Next.js 라우터 훅
    // 점수 데이터 상태
    const [scores, setScores] = useState<Scores | null>(null);
    // 각 차원의 최대 가능 점수 상태
    const [maxStrengths, setMaxStrengths] = useState<MaxStrengths | null>(null);
    // 로딩 또는 오류 상태 메시지
    const [message, setMessage] = useState<string>('결과 데이터를 불러오는 중입니다...');
    // 최종 유형 문자열 상태 (예: ENTP-AH)
    const [finalType, setFinalType] = useState<string | null>(null);
    // 각 차원별 결과 표시용 데이터 상태
    const [dimensionDisplayResults, setDimensionDisplayResults] = useState<
        {
            dimension: keyof Scores;
            // trait1: string; // 첫 번째 극성 문자 (positive pole 예: E, N, T, J, A, H) - 디버깅용으로 사용했으나, 렌더링에서는 dominantTraitLetter 사용
            // trait2: string; // 두 번째 극성 문자 (negative pole 예: I, S, F, P, B, L) - 디버깅용으로 사용했으나, 렌더링에서는 dominantTraitLetter 사용
            dominantTraitLetter: string; // 우세한 극성 문자 (또는 중립 문자열)
            dominantTraitFullName: string; // 우세한 극성의 전체 이름 (예: Extraversion)
            dominantPercentage: number | null; // 우세한 극성의 백분율 (중립일 경우 null)
            totalScore: number; // 해당 차원의 총점 (디버깅 또는 추가 정보 표시용)
        }[] | null
    >(null);


    // **** 페이지 로드 시 (컴포넌트 마운트 시) 실행되는 이펙트 ****
    // URL 쿼리 파라미터에서 점수 및 최대 강도 데이터를 읽어와 처리합니다.
    useEffect(() => {
        // 라우터가 준비될 때까지 기다립니다.
        if (!router.isReady) {
            return;
        }

        console.log("ResultsPage: Router ready. Query:", router.query);

        // 쿼리 파라미터에서 'scores'와 'maxStrengths' 값을 가져옵니다.
        const { scores: scoresQueryParam, maxStrengths: maxStrengthsQueryParam } = router.query;

        if (scoresQueryParam && maxStrengthsQueryParam) {
            try {
                // JSON 문자열을 파싱하여 점수 및 최대 강도 객체로 변환
                const parsedScores: Scores = JSON.parse(scoresQueryParam as string);
                const parsedMaxStrengths: MaxStrengths = JSON.parse(maxStrengthsQueryParam as string);

                setScores(parsedScores);
                setMaxStrengths(parsedMaxStrengths);
                setMessage(''); // 로딩 메시지 제거

                // 최종 유형 문자열 생성
                const typeString = getFinalTypeString(parsedScores);
                setFinalType(typeString);

                // 각 차원별 결과 계산 및 표시용 데이터 생성
                const displayResults: typeof dimensionDisplayResults = [];
                (['EI', 'SN', 'TF', 'JP', 'AB', 'HL'] as (keyof Scores)[]).forEach(dimension => {
                    const score = parsedScores[dimension];
                    const maxStrength = parsedMaxStrengths[dimension];

                    // 해당 차원의 극성 문자 결정 (positive pole, negative pole)
                    // trait1: positive pole (E, N, T, J, A, H 등)
                    // trait2: negative pole (I, S, F, P, B, L 등)
                    let positivePoleLetter = '';
                    let negativePoleLetter = '';

                    switch (dimension) {
                        case 'EI': positivePoleLetter = 'E'; negativePoleLetter = 'I'; break;
                        case 'SN': positivePoleLetter = 'N'; negativePoleLetter = 'S'; break; // S/N만 positive/negative pole 라벨 순서가 다릅니다.
                        case 'TF': positivePoleLetter = 'T'; negativePoleLetter = 'F'; break;
                        case 'JP': positivePoleLetter = 'J'; negativePoleLetter = 'P'; break;
                        case 'AB': positivePoleLetter = 'A'; negativePoleLetter = 'B'; break; // AB 차원, A:+, B:- (가정)
                        case 'HL': positivePoleLetter = 'H'; negativePoleLetter = 'L'; break; // HL 차원, H:+, L:- (가정)
                        // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 극성 문자 설정 추가
                        // case 'O': positivePoleLetter = 'O'; negativePoleLetter = 'C'; break; // O:+, C:- (가정)
                        // case 'C': positivePoleLetter = 'C'; negativePoleLetter = 'U'; break; // C:+, U:- (가정)
                        // case 'EM': positivePoleLetter = 'E'; negativePoleLetter = 'C'; break; // 사용자 정의 EM 차원, E:+, C:- (가정)
                    }


                    // 백분율 계산 (percentNegativePole: negative pole 방향 백분율, percentPositivePole: positive pole 방향 백분율)
                    const { percentNegativePole, percentPositivePole } = calculatePercentage(score, maxStrength);

                    // **** 수정된 부분 시작: 우세한 극성 문자와 해당 백분율 결정 로직 ****
                    let dominantTraitLetter;
                    let dominantTraitFullName = '';
                    let percentageToDisplay: number | null = null; // 실제로 표시할 백분율 (우세한 극성의 백분율)

                    if (score === 0) {
                        // 점수가 0이면 중립
                        dominantTraitLetter = `${positivePoleLetter}/${negativePoleLetter}`; // 예: E/I
                        dominantTraitFullName = 'Neutral'; // 중립 표시
                        percentageToDisplay = null; // 중립일 경우 백분율 없음
                    } else if (score > 0) {
                        // 점수가 양수이면 'positive pole'이 우세
                        dominantTraitLetter = positivePoleLetter; // 예: E, N, T, J, A, H 등
                        percentageToDisplay = percentPositivePole; // positive pole의 백분율
                        dominantTraitFullName = dimensionFullNames[dimension]?.[dominantTraitLetter] || dominantTraitLetter;

                    } else { // score < 0
                        // 점수가 음수이면 'negative pole'이 우세
                        dominantTraitLetter = negativePoleLetter; // 예: I, S, F, P, B, L 등
                        percentageToDisplay = percentNegativePole; // negative pole의 백분율
                        dominantTraitFullName = dimensionFullNames[dimension]?.[dominantTraitLetter] || dominantTraitLetter;
                    }
                    // **** 수정된 부분 끝 ****

                     // 디버깅 로그 추가
                     console.log(`Dimension: ${dimension}, Score: ${score}, MaxStrength: ${maxStrength}, Neg%: ${percentNegativePole}, Pos%: ${percentPositivePole}, Dominant Letter (Corrected): ${dominantTraitLetter}, Dominant Full Name: ${dominantTraitFullName}, Display Percentage: ${percentageToDisplay}`);


                    displayResults.push({
                        dimension,
                        dominantTraitLetter, // 수정된 우세 극성 문자
                        dominantTraitFullName, // 우세 극성의 전체 이름 추가
                        dominantPercentage: percentageToDisplay, // 우세 극성의 백분율
                        totalScore: score, // 디버깅용 또는 추가 정보
                    });
                });

                setDimensionDisplayResults(displayResults);

            } catch (error) {
                console.error("ResultsPage: Error processing data:", error);
                setMessage("결과 데이터를 처리하는데 오류가 발생했습니다.");
            }
        } else {
            console.warn("ResultsPage: Missing scores or maxStrengths in query parameter.");
            setMessage("결과 데이터가 없습니다. 검사를 다시 진행해주세요.");
        }

    }, [router.isReady, router.query]); // 라우터 준비 상태와 쿼리가 변경될 때마다 이펙트 재실행


    // **** 렌더링 부분 ****

    // 로딩 또는 오류 메시지 표시
    if (!scores || !maxStrengths || !dimensionDisplayResults) {
        return (
            // CSS Modules 클래스 사용
            <div className={styles.completionContainer}>
                <h1>{message.includes('오류') ? '오류 발생' : '로딩 중'}</h1>
                <p>{message}</p>
                 {/* 오류 발생 시 홈으로 돌아가기 버튼 */}
                 {message.includes('오류') && (
                      <button onClick={() => router.push('/')} className={styles.resultButton}>
                          홈으로 돌아가기
                      </button>
                 )}
            </div>
        );
    }

    // 결과 화면 표시
    return (
        // CSS Modules 클래스 사용
        <div className={styles.container}>
            {/* 페이지 제목 */}
            <Head>
                <title>MBCO TEST - Results</title>
                <meta name="description" content="MBCO MBTI + HEXACO Test Results" />
                {/* 파비콘 등 필요한 메타데이터 추가 */}
            </Head>

            <h1>My EMCO Type?</h1>

            {/* 최종 유형 문자열 표시 */}
            {finalType && (
                <div className={styles.finalType}>
                    {finalType}
                </div>
            )}

            {/* 각 차원별 결과 영역 컨테이너 (노란색 박스들을 감싸는 컨테이너) */}
            <div className={styles.dimensionResults}>

                {/* MBTI 지표 결과 박스 */}
                <div className={styles.resultBox}>
                    <h2>MBTI</h2>
                    {/* EI, SN, TF, JP 순서로 표시 */}
                    {dimensionDisplayResults.filter(r => ['EI', 'SN', 'TF', 'JP'].includes(r.dimension)).map(result => (
                         <p key={result.dimension} className={styles.resultItem}>
                             {/* 우세한 극성 문자와 백분율 표시 */}
                             {result.dominantPercentage !== null ? (
                                 <>
                                     {/* 우세한 극성 문자 (예: E, N) */}
                                     {result.dominantTraitLetter}
                                     {/* 우세한 극성 전체 이름 (예: Extraversion, iNtuition) */}
                                     ({result.dominantTraitFullName})
                                     {/* 우세한 극성 백분율 (크고 진하게) */}
                                     <span className={styles.dominantPercentage}>
                                         {result.dominantPercentage}%
                                     </span>
                                 </>
                             ) : (
                                 // 중립일 경우 (예: E/I (중립))
                                 `${result.dominantTraitLetter} (${result.dominantTraitFullName})`
                             )}
                         </p>
                    ))}
                </div>

                {/* HEXACO 지표 결과 박스 */}
                <div className={styles.resultBox}>
                    <h2>HEXACO</h2>
                    {/* AB, HL 순서로 표시 */}
                     {dimensionDisplayResults.filter(r => ['AB', 'HL'].includes(r.dimension)).map(result => (
                         <p key={result.dimension} className={styles.resultItem}>
                             {/* 우세한 극성 문자와 백분율 표시 */}
                             {result.dominantPercentage !== null ? (
                                 <>
                                     {/* 우세한 극성 문자 (예: A, H) */}
                                     {result.dominantTraitLetter}
                                     {/* 우세한 극성 전체 이름 (예: Assertiveness, Honesty) */}
                                     ({result.dominantTraitFullName})
                                     {/* 우세한 극성 백분율 (크고 진하게) */}
                                     <span className={styles.dominantPercentage}>
                                         {result.dominantPercentage}%
                                     </span>
                                 </>
                             ) : (
                                 // 중립일 경우 (예: A/B (중립))
                                 `${result.dominantTraitLetter} (${result.dominantTraitFullName})`
                             )}
                         </p>
                     ))}
                    {/* TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 결과 표시 추가 */}
                    {/* {dimensionDisplayResults.filter(r => ['O', 'C', 'EM'].includes(r.dimension)).map(result => (
                         <p key={result.dimension} className={styles.resultItem}>
                             {result.dominantPercentage !== null ? (
                                 <>
                                     {result.dominantTraitLetter}
                                     ({result.dominantTraitFullName})
                                     <span className={styles.dominantPercentage}>
                                         {result.dominantPercentage}%
                                     </span>
                                 </>
                             ) : (
                                 `${result.dominantTraitLetter} (${result.dominantTraitFullName})`
                             )}
                         </p>
                     ))} */}
                </div>

                {/* TODO: 나중에 전체 유형에 대한 설명 텍스트 추가 */}
                {/* <div className={styles.overallExplanation}> ... </div> */}

            </div>

            {/* 홈으로 돌아가기 버튼 */}
            <button onClick={() => router.push('/')} className={styles.retryButton}>
                홈으로 돌아가기
            </button>

            {/* 디버깅용 raw 데이터 표시 (주석 처리 또는 삭제 가능) */}
            {/* <div style={{ marginTop: '40px', color: '#aaa', textAlign: 'left' }}>
                <h3>Raw Scores:</h3>
                <pre style={{ color: 'lightgreen', textAlign: 'left', maxWidth: '90%', overflowX: 'auto' }}>
                    {JSON.stringify(scores, null, 2)}
                </pre>
                 <h3>Raw Max Strengths:</h3>
                <pre style={{ color: 'lightblue', textAlign: 'left', maxWidth: '90%', overflowX: 'auto' }}>
                    {JSON.stringify(maxStrengths, null, 2)}
                </pre>
                 <h3>Display Results:</h3>
                 <pre style={{ color: 'yellow', textAlign: 'left', maxWidth: '90%', overflowX: 'auto' }}>
                    {JSON.stringify(dimensionDisplayResults, null, 2)}
                </pre>
            </div> */}

        </div>
    );
}

export default ResultsPage; // 컴포넌트를 기본 내보내기로 설정합니다.