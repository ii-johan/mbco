// src/pages/enneagram-results.tsx

import React, { useEffect, useState } from 'react'; // 필요한 훅 임포트: useEffect, useState
import Head from 'next/head'; // Head 컴포넌트 임포트
import { useRouter } from 'next/router'; // useRouter 훅 임포트
import styles from './enneagram-results.module.css'; // 결과 페이지 CSS 모듈 임포트 (동일 폴더)

// 에니어그램 설명 데이터 임포트 (src/data 폴더에서)
import { typeDescriptions, wingDescriptions, TypeDescription, WingDescription } from '../data/enneagramDescriptions';

// TODO: 에니어그램 유형별 이름 매핑 데이터 (이미 있을 수 있음)
// 이 데이터는 typeDescriptions에 포함된 name_ko, name_en으로 대체될 수 있습니다.
// 만약 typeDescriptions에 이름 정보가 부족하다면 아래 객체를 사용하거나 확장하세요.
const enneagramTypeNames: { [key: number]: { en: string; ko: string } } = {
    1: { en: 'The Reformer', ko: '원칙주의자' },
    2: { en: 'The Helper', ko: '이타주의자' },
    3: { en: 'The Achiever', ko: '성취주의자' },
    4: { en: 'The Individualist', ko: '개성주의자' }, // typeDescriptions의 name_ko와 일치시켜주는 것이 좋습니다.
    5: { en: 'The Investigator', ko: '탐구주의자' }, // typeDescriptions의 name_ko와 일치시켜주는 것이 좋습니다.
    6: { en: 'The Loyalist', ko: '충성주의자' }, // typeDescriptions의 name_ko와 일치시켜주는 것이 좋습니다.
    7: { en: 'The Enthusiast', ko: '낙천주의자' }, // typeDescriptions의 name_ko와 일치시켜주는 것이 좋습니다.
    8: { en: 'The Challenger', ko: '도전주의자' }, // typeDescriptions의 name_ko와 일치시켜주는 것이 좋습니다.
    9: { en: 'The Peacemaker', ko: '평화주의자' }, // typeDescriptions의 name_ko와 일치시켜주는 것이 좋습니다.
};


// 유형별 점수를 바탕으로 기본 유형과 날개 유형을 판별하는 함수 (컴포넌트 바깥에 정의)
// 이 함수는 넘겨받은 점수와 에니어그램 판별 규칙을 사용하여 결과를 계산합니다.
const calculatePrimaryAndWing = (scores: { [type: number]: number }) => {
    // 점수 객체를 [유형 번호(문자열), 점수] 형태의 배열로 변환하고 점수가 높은 순서로 정렬합니다.
    // Object.entries는 객체의 키(여기서는 숫자 1-9가 문자열로 변환됨)와 값을 배열의 요소로 만듭니다.
    const sortedScores = Object.entries(scores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    // 가장 높은 점수를 받은 유형이 기본 유형입니다. (첫 번째 요소의 키를 숫자로 변환)
    const primaryType = sortedScores.length > 0 ? parseInt(sortedScores[0][0], 10) : null;

    let wingType: number | null = null;

    // 기본 유형이 판별되었다면 날개 유형을 판별합니다.
    if (primaryType !== null) {
        // 기본 유형의 인접 유형 번호를 찾습니다. 에니어그램 원형 구조를 고려합니다.
        const adjacentTypes = [];
        if (primaryType === 1) {
            adjacentTypes.push(9, 2); // 1번 유형의 인접은 9번, 2번
        } else if (primaryType === 9) {
             adjacentTypes.push(8, 1); // 9번 유형의 인접은 8번, 1번
        } else {
            // 그 외 유형 (2~8번)은 -1, +1 번호가 인접 유형입니다.
            adjacentTypes.push(primaryType - 1, primaryType + 1);
        }

        // 인접 유형들의 점수를 가져옵니다. 점수가 없을 수 있으므로 || 0으로 기본값 처리합니다.
        const adjacentScores = adjacentTypes
            .map(type => ({ type: type, score: scores[type] || 0 }))
            .sort((a, b) => b.score - a.score); // 점수가 높은 순서로 정렬

        // 인접 유형 중 점수가 더 높은 유형이 날개 유형입니다.
        // 점수가 동일한 경우, 어떤 날개를 선택할지는 테스트의 규칙에 따릅니다.
        // 여기서는 간단히 먼저 오는 유형을 선택합니다.
        if (adjacentScores.length > 0) {
            wingType = adjacentScores[0].type;
             // TODO: 날개 판별에 대한 더 정교한 로직이 필요할 수 있습니다. (예: 점수 차이 임계값)
        }
    }

    // TODO: 성격 건강 수준 (Level of Development) 판별 로직 추가 필요
    // 이 부분은 테스트의 채점 기준에 따라 복잡한 계산이 필요합니다.
    // 현재는 임시로 'Average'로 설정하고 있습니다.
    const developmentLevel = 'Average'; // 임시 건강 수준

    // 계산된 최종 결과 객체를 반환합니다.
    return {
        primaryType: primaryType, // 계산된 기본 유형 번호
        wingType: wingType, // 계산된 날개 유형 번호
        developmentLevel: developmentLevel, // 계산 또는 임시 설정된 건강 수준
        allTypeScores: sortedScores // 모든 유형 점수 (높은 순서로 정렬된 배열)
    };
};


// EnneagramResultsPage 함수형 컴포넌트 정의 시작
function EnneagramResultsPage() {
  // useRouter 훅을 사용하여 라우터 객체에 접근
  const router = useRouter();

  // 최종 결과 (기본 유형, 날개, 건강 수준, 모든 점수)를 저장할 상태 변수
  const [finalResult, setFinalResult] = useState<{
      primaryType: number | null; // 기본 유형 (숫자)
      wingType: number | null; // 날개 유형 (숫자)
      developmentLevel: string | null; // 건강 수준 (문자열 또는 다른 타입)
      allTypeScores: [string, number][]; // 모든 유형 점수 [유형번호(문자열), 점수]
  } | null>(null); // 초기 상태는 null (결과 로딩 전)

  // 로딩 또는 오류 상태 관리를 위한 상태 변수 (필요시 추가)
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);


  // 컴포넌트가 마운트되거나 router.query 값이 변경될 때 실행되는 useEffect 훅
  useEffect(() => {
      // router.query에서 'scores' 쿼리 파라미터 값을 읽어옵니다.
      // 값은 문자열 형태입니다.
      const scoresQuery = router.query.scores;

      // 'scores' 쿼리 파라미터가 존재하고 문자열 형식이면 처리합니다.
      if (scoresQuery && typeof scoresQuery === 'string') {
          try {
              // JSON.parse()를 사용하여 JSON 문자열을 JavaScript 객체로 변환합니다.
              const parsedScores = JSON.parse(scoresQuery);

              // 파싱된 데이터가 유효한 객체 형태인지 간단히 확인합니다.
              if (typeof parsedScores === 'object' && parsedScores !== null) {
                  // ** 받은 점수 객체 (parsedScores)를 바탕으로 최종 결과 (기본 유형, 날개 등)를 계산합니다. **
                  // calculatePrimaryAndWing 함수는 컴포넌트 밖에 정의되어 있으므로 여기서 호출 가능합니다.
                  const calculatedResult = calculatePrimaryAndWing(parsedScores);

                  // 계산된 최종 결과 객체를 finalResult 상태 변수에 저장합니다.
                  setFinalResult(calculatedResult);

                  console.log("Final Enneagram Result:", calculatedResult); // 계산된 최종 결과 확인 (개발자 도구 콘솔)

              } else {
                  // 파싱은 성공했지만 데이터 형식이 예상과 다를 경우 오류 처리
                  console.error("받은 점수 데이터 형식이 올바르지 않습니다.");
                  // 사용자에게 오류 메시지 표시 또는 테스트 시작 페이지로 리다이렉트 고려
                  // setError("테스트 결과 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
              }
          } catch (error) {
              // JSON 파싱 중 오류 발생 시 오류 처리
              console.error("점수 데이터 파싱 중 오류 발생:", error);
              // 사용자에게 오류 메시지 표시 또는 테스트 시작 페이지로 리다이렉트 고려
              // setError("테스트 결과 데이터를 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.");
          } finally {
              // 데이터 처리 완료 (성공 또는 실패 모두) 후 로딩 상태 해제 (필요시)
              // setLoading(false);
          }
      } else {
          // 'scores' 쿼리 파라미터가 없거나 문자열이 아닌 경우 (예: URL 직접 접근)
          console.warn("결과 점수 데이터가 없습니다. 테스트 페이지를 통해 접근해주세요.");
          // 결과 데이터 없이 결과 페이지에 접근한 경우 처리
          // 만약 finalResult 상태가 아직 null이라면, 테스트 시작 페이지로 자동 리다이렉트
           if (!finalResult) {
              // setError("테스트 결과를 불러올 수 없습니다. 테스트를 먼저 완료해주세요.");
              // 개발 환경에서는 잠시 기다렸다가 리다이렉트
              setTimeout(() => {
                 router.push('/enneagram-test'); // 테스트 시작 페이지로 이동
              }, 2000); // 2초 후 이동
           }
           // setLoading(false); // 로딩 상태 해제 (필요시)
      }
  // ** 수정된 의존성 배열 **
  }, [router.query, router]); // finalResult 제거하여 무한 루프 방지

  // 결과 데이터 (finalResult)가 아직 로드되거나 계산되지 않은 경우 로딩 UI 표시
  if (!finalResult) {
       return (
           <div className={styles.container}>
               <h1>결과 로딩 중...</h1>
               <p>테스트 결과를 계산하는 중입니다. 잠시만 기다려 주세요.</p>
               {/* 필요시 로딩 스피너 또는 애니메이션 추가 */}
               {/* {error && <p className={styles.error}>{error}</p>} */} {/* 오류 메시지 표시 */}
               {/* TODO: 홈으로 돌아가는 버튼 추가 (오류 시 유용) */}
               {/* <button onClick={() => router.push('/')} className={styles.homeButton}>홈으로 돌아가기</button> */}
           </div>
       );
  }

  // 결과 데이터 (finalResult)가 성공적으로 로드되고 계산되었다면 화면을 표시합니다.
  // finalResult 객체에서 필요한 정보를 구조 분해 할당으로 가져옵니다.
   const { primaryType, wingType, developmentLevel, allTypeScores } = finalResult;

   // 기본 유형 번호를 사용하여 TypeDescription 데이터에서 이름과 설명을 가져옵니다.
   // typeDescriptions 객체에 해당 유형이 없을 경우를 대비해 안전하게 접근합니다.
   const primaryTypeInfo: TypeDescription | undefined = primaryType ? typeDescriptions[primaryType] : undefined;

   // 한국어 이름 가져오기: typeDescriptions에 이름이 있다면 그것을 사용하고, 없으면 enneagramTypeNames를 사용하거나 "유형 X" 형식으로 표시
   const primaryTypeName_ko = primaryTypeInfo?.name_ko || (primaryType ? enneagramTypeNames[primaryType]?.ko || `유형 ${primaryType}` : '?');
   // 기본 유형의 일반 설명 한국어 가져오기
   const primaryTypeGeneralDescription_ko = primaryTypeInfo?.generalDescription_ko || '기본 유형에 대한 일반 설명을 찾을 수 없습니다.'; // 데이터가 없을 경우 기본 메시지

   // 날개 조합 키를 생성하여 WingDescription 데이터를 가져옵니다.
   // 기본 유형과 날개 유형이 모두 null이 아닐 때만 키를 생성합니다.
   const wingKey = primaryType !== null && wingType !== null ? `${primaryType}-${wingType}` : undefined;
   // wingDescriptions 객체에 해당 날개 조합이 없을 경우를 대비해 안전하게 접근합니다.
   const wingInfo: WingDescription | undefined = wingKey ? wingDescriptions[wingKey] : undefined;

   // 날개 조합 설명 한국어 가져오기
   const wingDescription_ko = wingInfo?.description_ko || '날개 유형에 대한 설명을 찾을 수 없습니다.'; // 데이터가 없을 경우 기본 메시지


   // 간략 결과 문자열 생성 (예: 1-W2-Average)
   // 기본 유형, 날개 유형, 건강 수준 정보를 포함하여 문자열을 만듭니다.
   const summarizedResult = `${primaryType !== null ? primaryType : '?'}-W${wingType !== null ? wingType : '?'}-${developmentLevel || '?'}`;

   // 점수 목록 표시를 위해 모든 유형 점수(allTypeScores)를 사용합니다.
   // 요청대로 상위 3개만 표시하려면 .slice(0, 3)을 사용합니다.
   const scoresToDisplay = allTypeScores; // 모든 점수를 표시 (혹은 .slice(0, 3)로 상위 3개만)


  // ***** 컴포넌트 렌더링 부분 (JSX) *****
  return (
    <>
      {/* 페이지 Head 설정 */}
      <Head>
        {/* 페이지 제목 설정 */}
        <title>My Enneagram Result - {summarizedResult}</title>
        {/* 페이지 설명 메타 태그 설정 */}
        <meta name="description" content={`My Enneagram Type is ${summarizedResult}`} />
         {/* TODO: 파비콘 등 필요한 다른 메타 태그 추가 */}
      </Head>

      {/* 결과 페이지의 메인 컨테이너 */}
      <div className={styles.container}>
        {/* 결과 페이지의 메인 제목 */}
        <h1 className={styles.mainTitle}>My Enneagram Type?</h1>

        {/* 간략 결과 표기 영역 */}
        <div className={styles.summarizedResult}>
            {/* 계산된 간략 결과 문자열 표시 */}
            {summarizedResult}
        </div>

        {/* 세부 설명 표시를 위한 노란색 박스 */}
        <div className={styles.detailsBox}>
            <h2>상세 결과</h2>

            {/* 기본 유형 정보 표시 */}
            {primaryType !== null && (
                 <> {/* 기본 유형 관련 정보를 그룹화 */}
                    <p><strong>기본유형(Primary Type)은 {primaryType}번({primaryTypeName_ko})입니다.</strong></p>
                    {/* 기본 유형 일반 설명 표시 (데이터가 있을 경우) */}
                    {primaryTypeInfo && <p>{primaryTypeGeneralDescription_ko}</p>}
                    {/* TODO: 필요하다면 기본 유형의 핵심 동기, 두려움 등 상세 설명 추가 */}
                 </>
            )}

            {/* 날개 유형 정보 표시 */}
            {wingType !== null && (
                 <> {/* 날개 유형 관련 정보를 그룹화 */}
                    <p><strong>날개유형(Wing Type)은 {wingType}번입니다.</strong></p>
                    {/* 날개 조합 설명 표시 (데이터가 있을 경우) */}
                    {wingInfo && <p>{wingDescription_ko}</p>}
                    {/* TODO: 필요하다면 날개 유형의 특징 등 상세 설명 추가 */}
                 </>
            )}

            {/* 성격 건강 수준 정보 표시 */}
             {developmentLevel && (
                <> {/* 건강 수준 관련 정보를 그룹화 */}
                   <p><strong>성격건강(Level of Development)은 {developmentLevel}({developmentLevel === 'Average' ? '보통' : '판별 로직 필요'})입니다.</strong></p> {/* 임시 표시 */}
                   {/* TODO: 성격 건강 수준별 상세 설명 표시 (별도 데이터 및 로직 필요) */}
                </>
             )}

            {/* 모든 유형 점수 표시 */}
            <p><strong>유형별 점수:</strong></p>
            <ul>
                 {/* scoresToDisplay 배열을 순회하며 각 유형의 점수 표시 */}
                 {/* 현재는 모든 점수를 표시하도록 설정되어 있습니다. 상위 N개만 필요시 .slice(0, N) 적용 */}
                 {scoresToDisplay.map(([type, score]) => (
                     // key prop은 React 리스트 렌더링 시 필수입니다. 유형 번호를 사용합니다.
                     <li key={`score-${type}`}>{type}번 ({score}점)</li>
                 ))}
            </ul>

             {/* TODO: 필요하다면 스트레스 및 통합 방향 정보 등 추가 (별도 데이터 및 로직 필요) */}
             {/* 예: <p>스트레스 방향: {stressDirectionType}번</p> */}
             {/* 예: <p>통합 방향: {integrationDirectionType}번</p> */}

        </div>

        {/* ********** 처음으로 돌아가기 버튼 ********** */}
        {/* 클릭 시 router.push('/')를 사용하여 시작 페이지로 이동합니다. */}
        <button onClick={() => { // <-- console.log를 추가했습니다.
            console.log('처음으로 돌아가기 버튼 클릭됨!'); // <-- 이 줄이 추가되었습니다.
            router.push('/'); // 시작 페이지로 이동
        }} className={styles.homeButton}>
            처음으로 돌아가기
        </button>
        {/* ********** 버튼 끝 ********** */}


        {/* TODO: 필요하다면 추가적인 결과 분석, 설명 영역, 이미지 등 추가 */}

      </div>
    </>
  );
} // EnneagramResultsPage 함수 컴포넌트 정의 끝

// EnneagramResultsPage 컴포넌트를 기본 내보내기로 설정합니다. (파일 맨 마지막)
export default EnneagramResultsPage;

// enneagramTypeNames, calculatePrimaryAndWing 함수는 컴포넌트 정의 전에 있어야 합니다.