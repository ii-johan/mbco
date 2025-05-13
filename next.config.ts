import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // 정적 웹사이트 형태로 빌드하기 위해 output 설정을 'export'로 변경합니다.
  // 이 설정을 통해 'npm run build' 또는 'yarn run build' 실행 시
  // 프로젝트 폴더 안에 'out' 디렉토리가 생성됩니다.
  output: 'export',

  // 필요에 따라 URL 끝에 슬래시(/)를 붙일지 설정할 수 있습니다.
  // trailingSlash: true,
};

export default nextConfig; // 이 줄이 꼭 있어야 합니다!
