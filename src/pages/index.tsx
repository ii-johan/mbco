// my-embico-app/src/pages/index.tsx 파일에서 StartPage 컴포넌트 임포트 경로 수정

import Head from 'next/head'; // Next.js의 Head 컴포넌트 임포트
// StartPage 컴포넌트 임포트 경로 수정: '../src/components/StartPage/StartPage' -> '../components/StartPage/StartPage'
import StartPage from '../components/StartPage/StartPage'; // StartPage 컴포넌트 임포트
import React from 'react'; // React 임포트 (JSX 사용을 위해 필요)


// 홈 페이지 컴포넌트를 정의합니다.
// 이 컴포넌트는 StartPage 컴포넌트를 렌더링하여 시작 화면을 보여줍니다.
const Home: React.FC = () => {
  return (
    <>
      {/* 페이지의 <head> 요소를 관리합니다. */}
      <Head>
        <title>EMCO TEST</title> {/* 브라우저 탭에 표시될 페이지 제목 */}
        <meta name="description" content="MBTI + HEXACO Personality Test" /> {/* 검색 엔진 최적화를 위한 페이지 설명 */}
        {/* <link rel="icon" href="/favicon.ico" /> {/* 파비콘 설정 (public 폴더에 favicon.ico 파일이 있어야 합니다) */}
      </Head>

      {/* StartPage 컴포넌트를 렌더링합니다. */}
      {/* StartPage 컴포넌트 내부에 모든 시작 화면 UI와 로직이 포함되어 있습니다. */}
      <StartPage />

      {/*
        TODO: 필요하다면 여기에 전역적인 푸터나 다른 레이아웃 요소를 추가할 수 있습니다.
        현재 StartPage 컴포넌트가 전체 화면을 차지하도록 디자인되어 있다면 추가 요소는 필요 없을 수 있습니다.
      */}
    </>
  );
};

// Home 컴포넌트를 이 파일의 기본 내보내기로 설정합니다.
// Next.js는 pages 디렉토리의 파일을 페이지 컴포넌트로 인식하고 기본 내보내기를 사용합니다.
export default Home;