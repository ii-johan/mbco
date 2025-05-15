// my-embico-app/src/pages/results.tsx (수정본 - 백분율 오류 및 표시 방식 개선)

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
    AB: { A: 'Assertiveness', B: 'Boldness' }, // AB 차원 전체 이름 (예시)
    HL: { H: 'Honesty', L: 'Liberality' }, // HL 차원 전체 이름 (예시)
    // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 전체 이름 추가
    // O: { O: 'Openness', C: 'Closedness' },
    // C: { C: 'Conscientiousness', U: 'Unconscientiousness' },
    // EM: { E: 'Emotional', C: 'Calm' }, // 사용자 정의 EM 차원 전체 이름 (예시)
};

// 각 차원의 우세 성향 문자를 결정하는 함수 (0점일 경우 중립 처리)
const getResultTypeLetter = (score: number, dimension: keyof Scores): string => {
    // 점수가 0일 경우 중립을 나타내는 문자열 반환 (예: E/I, S/N 등)
    if (score === 0) {
        switch (dimension) {
            case 'EI': return 'E/I';
            case 'SN': return 'S/N';
            case 'TF': return 'T/F';
            case 'JP': return 'J/P';
            case 'AB': return 'A/B'; // AB 차원 중립 표시
            case 'HL': return 'H/L'; // HL 차원 중립 표시
            // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 중립 표시 추가
            // case 'O': return 'O/C';
            // case 'C': return 'C/U';
            // case 'EM': return 'E/C'; // 사용자 정의 EM 차원 중립 표시
            default: return '';
        }
    }
    // 점수가 양수 또는 음수일 경우 해당 극성 문자 반환
    if (dimension === 'JP') return score > 0 ? 'J' : 'P';
    if (dimension === 'EI') return score > 0 ? 'E' : 'I';
    if (dimension === 'SN') return score > 0 ? 'N' : 'S'; // S/N 차원은 N이 양수 방향이라고 가정
    if (dimension === 'TF') return score > 0 ? 'T' : 'F';
    if (dimension === 'AB') return score > 0 ? 'A' : 'B'; // AB 차원, A가 양수 방향이라고 가정
    if (dimension === 'HL') return score > 0 ? 'H' : 'L'; // HL 차원, H가 양수 방향이라고 가정

    // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 극성 문자 반환 로직 추가
    // if (dimension === 'O') return score > 0 ? 'O' : 'C';
    // if (dimension === 'C') return score > 0 ? 'C' : 'U';
    // if (dimension === 'EM') return score > 0 ? 'E' : 'C'; // 사용자 정의 EM 차원 극성 문자 반환 로직

    return ''; // 알 수 없는 차원
};

// 각 지표별 백분율을 계산하는 함수
// score: 해당 차원의 총점
// maxPossibleScore: 해당 차원에서 얻을 수 있는 최대 총점 절대값 (문항 수 * 3)
const calculatePercentage = (score: number, maxPossibleScore: number): { percentNegativePole: number, percentPositivePole: number } => {
    // maxPossibleScore가 0이거나 음수이면 계산 불가 (오류 방지)
    if (maxPossibleScore <= 0) {
        console.warn(`calculatePercentage: maxPossibleScore is invalid (${maxPossibleScore}). Returning 50/50.`);
        return { percentNegativePole: 50, percentPositivePole: 50 };
    }

    // 점수 범위 [-max, +max]를 백분율 범위 [0, 100]으로 매핑
    // -max -> 0%, 0 -> 50%, +max -> 100%
    const percentageTowardsPositivePole = Math.round(((score + maxPossibleScore) / (2 * maxPossibleScore)) * 100);

    // 백분율 합계가 100이 되도록 보정 (반올림 오차 처리)
    const percentPositivePole = percentageTowardsPositivePole;
    const percentNegativePole = 100 - percentageTowardsPositivePole;

    return {
        percentNegativePole, // 음수 극성 방향의 백분율 (I, S, F, P, B, L)
        percentPositivePole // 양수 극성 방향의 백분율 (E, N, T, J, A, H)
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
            trait1: string; // 첫 번째 극성 문자 (예: E, S, T, J, A, H)
            trait2: string; // 두 번째 극성 문자 (예: I, N, F, P, B, L)
            dominantTraitLetter: string; // 우세한 극성 문자 (또는 중립 문자열)
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

                    // 해당 차원의 극성 문자 결정 (trait1, trait2)
                    let trait1 = ''; // 예: E, S, T, J, A, H (음수 극성 방향)
                    let trait2 = ''; // 예: I, N, F, P, B, L (양수 극성 방향)
                    switch (dimension) {
                        case 'EI': trait1 = 'E'; trait2 = 'I'; break; // E가 양수, I가 음수
                        case 'SN': trait1 = 'S'; trait2 = 'N'; break; // S가 음수, N이 양수
                        case 'TF': trait1 = 'T'; trait2 = 'F'; break; // T가 양수, F가 음수
                        case 'JP': trait1 = 'J'; trait2 = 'P'; break; // J가 양수, P가 음수
                        case 'AB': trait1 = 'A'; trait2 = 'B'; break; // AB 차원, A가 양수, B가 음수 (가정)
                        case 'HL': trait1 = 'H'; trait2 = 'L'; break; // HL 차원, H가 양수, L이 음수 (가정)
                        // TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 극성 문자 설정 추가
                        // case 'O': trait1 = 'O'; trait2 = 'C'; break;
                        // case 'C': trait1 = 'C'; trait2 = 'U'; break;
                        // case 'EM': trait1 = 'E'; trait2 = 'C'; break; // 사용자 정의 EM 차원, E가 양수, C가 음수 (가정)
                    }

                    // 백분율 계산 (음수 극성 방향 백분율, 양수 극성 방향 백분율)
                    const { percentNegativePole, percentPositivePole } = calculatePercentage(score, maxStrength);

                    // 우세한 극성 문자와 해당 백분율 결정
                    let dominantTraitLetter;
                    let dominantPercentageValue: number | null = null;

                    if (score === 0) {
                         // 점수가 0이면 중립, 백분율은 표시하지 않음
                         dominantTraitLetter = `${trait1}/${trait2}`; // 예: E/I
                         dominantPercentageValue = null; // 중립일 경우 백분율 없음
                    } else if (score > 0) {
                         // 점수가 양수이면 '양수 극성 방향' (trait1)이 우세
                         // 예: EI 차원에서 score > 0 이면 E가 우세
                         // S/N 차원에서 score > 0 이면 N이 우세
                         dominantTraitLetter = trait2; // 양수 극성 문자 (I, N, F, P, B, L)
                         dominantPercentageValue = percentPositivePole; // 양수 극성 백분율
                    } else { // score < 0
                         // 점수가 음수이면 '음수 극성 방향' (trait2)이 우세
                         // 예: EI 차원에서 score < 0 이면 I가 우세
                         // S/N 차원에서 score < 0 이면 S가 우세
                         dominantTraitLetter = trait1; // 음수 극성 문자 (E, S, T, J, A, H)
                         dominantPercentageValue = percentNegativePole; // 음수 극성 백분율
                    }

                     // 디버깅 로그 추가
                     console.log(`Dimension: ${dimension}, Score: ${score}, MaxStrength: ${maxStrength}, Neg%: ${percentNegativePole}, Pos%: ${percentPositivePole}, Dominant: ${dominantTraitLetter}, Dominant%: ${dominantPercentageValue}`);


                    displayResults.push({
                        dimension,
                        trait1,
                        trait2,
                        dominantTraitLetter,
                        dominantPercentage: dominantPercentageValue,
                        totalScore: score,
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

            {/* 각 차원별 결과 표시 */}
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
                                     ({dimensionFullNames[result.dimension]?.[result.dominantTraitLetter] || result.dominantTraitLetter})
                                     {/* 우세한 극성 백분율 (크고 진하게) */}
                                     <span className={styles.dominantPercentage}>
                                         {result.dominantPercentage}%
                                     </span>
                                 </>
                             ) : (
                                 // 중립일 경우 (예: E/I (중립))
                                 `${result.dominantTraitLetter} (중립)`
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
                                     ({dimensionFullNames[result.dimension]?.[result.dominantTraitLetter] || result.dominantTraitLetter})
                                     {/* 우세한 극성 백분율 (크고 진하게) */}
                                     <span className={styles.dominantPercentage}>
                                         {result.dominantPercentage}%
                                     </span>
                                 </>
                             ) : (
                                 // 중립일 경우 (예: A/B (중립))
                                 `${result.dominantTraitLetter} (중립)`
                             )}
                         </p>
                     ))}
                    {/* TODO: 필요하다면 다른 HEXACO 차원(O, C) 또는 Emotionality 차원 결과 표시 추가 */}
                    {/* {dimensionDisplayResults.filter(r => ['O', 'C', 'EM'].includes(r.dimension)).map(result => (
                         <p key={result.dimension} className={styles.resultItem}>
                             {result.dominantPercentage !== null ? (
                                 <>
                                     {result.dominantTraitLetter}
                                     ({dimensionFullNames[result.dimension]?.[result.dominantTraitLetter] || result.dominantTraitLetter})
                                     <span className={styles.dominantPercentage}>
                                         {result.dominantPercentage}%
                                     </span>
                                 </>
                             ) : (
                                 `${result.dominantTraitLetter} (중립)`
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
