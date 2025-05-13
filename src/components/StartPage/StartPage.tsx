// my-embico-app/src/components/StartPage/StartPage.tsx (수정: 메인 타이틀 변경)

import React from 'react';
import styles from './StartPage.module.css'; // CSS 모듈 임포트
import { useRouter } from 'next/router'; // Next.js 라우터 임포트

function StartPage() {
  const router = useRouter();

  // 'Fast Test' 버튼 클릭 핸들러
  const handleFastTestStart = () => {
    router.push('/test?length=36');
    console.log("Fast Test 버튼 클릭됨. /test?length=36 로 이동");
  };

  // 'Full Test' 버튼 클릭 핸들러
  const handleFullTestStart = () => {
    router.push('/test?length=72');
     console.log("Full Test 버튼 클릭됨. /test?length=72 로 이동");
  };

  // 사용자 로고 컴포넌트 또는 이미지
  const UserLogo = () => (
    <div className={styles.logo}>
      {/* 현재는 임시 노란색 원. em1.jpg의 로고 이미지로 교체 필요 */}
      <div className={styles.placeholderLogo}></div>
    </div>
  );


  return (
    <div className={styles.container}>
      <UserLogo />

      {/* 제목 영역 */}
      <div className={styles.title}>
        {/* 메인 타이틀 텍스트 수정 */}
        <h1>EMCO TEST</h1> {/* "My Embico App" -> "EMCO TEST" */}
        <p>MBTI+HEXACO</p>
      </div>

      <div className={styles.startButtonArea}>
        <button className={styles.startButton} onClick={handleFastTestStart}>
          Fast Test (36문항)
        </button>
         <button className={styles.startButton} onClick={handleFullTestStart}>
          Full Test (72문항)
        </button>
      </div>

      <div className={styles.visitorStats}>
        <div className={styles.statBox}><p>today</p><p>0</p></div>
        <div className={styles.statBox}><p>year</p><p>0</p></div>
      </div>

    </div>
  );
}

export default StartPage;