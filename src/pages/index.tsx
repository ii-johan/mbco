// my-embico-app/src/pages/index.tsx 에 붙여넣을 코드

import React from 'react';
// src/pages에서 src/components로 이동하는 경로
import StartPage from '../components/StartPage/StartPage';


function HomePage() { // Next.js 페이지 컴포넌트
  return (
    <div>
      <StartPage /> {/* StartPage 컴포넌트 사용 */}
    </div>
  );
}

export default HomePage;