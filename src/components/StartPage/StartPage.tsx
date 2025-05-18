// my-embico-app/src/components/StartPage/StartPage.tsx

import React from 'react';
import styles from './StartPage.module.css'; // CSS 모듈 임포트
import { useRouter } from 'next/router'; // Next.js 라우터 임포트

// StartPage 함수형 컴포넌트를 정의합니다.
function StartPage() {
  // Next.js 라우터 훅을 사용하여 라우터 객체를 가져옵니다.
  const router = useRouter();

  // 'Fast Test' 버튼 클릭 시 실행될 핸들러 함수
  const handleFastTestStart = () => {
    // '/test' 경로로 이동하며, length 쿼리 파라미터를 36으로 설정합니다.
    router.push('/test?length=36');
    console.log("Fast Test 버튼 클릭됨. /test?length=36 로 이동");
  };

  // 'Full Test' 버튼 클릭 시 실행될 핸들러 함수
  const handleFullTestStart = () => {
    // '/test' 경로로 이동하며, length 쿼리 파라미터를 72로 설정합니다.
    router.push('/test?length=72');
    console.log("Full Test 버튼 클릭됨. /test?length=72 로 이동");
  };

  // 에니어그램 테스트 버튼 클릭 시 실행될 핸들러 함수 추가
  const handleEnneagramTestStart = () => {
    // TODO: 실제 에니어그램 테스트 페이지 경로로 변경해야 합니다.
    // 예시: '/enneagram-test' 라는 경로로 이동한다고 가정합니다.
    // 에니어그램 테스트 페이지를 아직 만들지 않았다면, 이 경로는 존재하지 않아 오류가 발생할 수 있습니다.
    const enneagramTestRoute = '/enneagram-test'; // 에니어그램 테스트 페이지 경로 설정
    router.push(enneagramTestRoute);
    console.log(`Enneagram Test 버튼 클릭됨. ${enneagramTestRoute} 로 이동`);
  };


  // 사용자 로고를 표시하는 컴포넌트 (현재는 임시 플레이스홀더)
  const UserLogo = () => (
    <div className={styles.logo}>
      {/* 현재는 임시 노란색 원. 실제 로고 이미지(em1.jpg 등)로 교체해야 합니다. */}
      {/* 이미지를 사용할 경우 <img src="/path/to/em1.jpg" alt="Embico Logo" className={styles.logoImage} /> 와 같이 변경하고 CSS도 수정해야 합니다. */}
      <div className={styles.placeholderLogo}></div>
    </div>
  );

  // 컴포넌트가 렌더링할 JSX를 반환합니다.
  return (
    // StartPage 전체 컨테이너에 CSS Modules 스타일 적용
    <div className={styles.container}>
      {/* 로고 영역 컴포넌트 */}
      <UserLogo />

      {/* 제목 영역 */}
      <div className={styles.title}>
        {/* 메인 타이틀 텍스트 수정 */}
        <h1>MBCO TEST</h1>
        {/* 부제목 텍스트 */}
        <p>MBTI+HEXACO</p>
      </div>

      {/* 검사 시작 버튼 영역 컨테이너 */}
      <div className={styles.startButtonArea}>
        {/* Fast Test 시작 버튼 */}
        <button className={styles.startButton} onClick={handleFastTestStart}>
          Fast MBCO (36문항)
        </button>
        {/* Full Test 시작 버튼 */}
        <button className={styles.startButton} onClick={handleFullTestStart}>
          Full MBCO (72문항)
        </button>
        {/* Enneagram Test 시작 버튼 추가 및 onClick 핸들러 연결 */}
        <button className={styles.startButton} onClick={handleEnneagramTestStart}>
          Enneagram (90 문항)
        </button>
      </div>

      {/* 방문자 통계 영역 (현재는 디자인만) */}
      <div className={styles.visitorStats}>
        {/* 오늘 방문자 수 (임시 값) */}
        <div className={styles.statBox}><p>today</p><p>0</p></div>
        {/* 연간 방문자 수 (임시 값) */}
        <div className={styles.statBox}><p>year</p><p>0</p></div>
      </div>

      {/* TODO: 필요하다면 푸터 등을 여기에 추가할 수 있습니다. */}

    </div>
  );
}

// StartPage 컴포넌트를 기본 내보내기로 설정합니다.
export default StartPage;