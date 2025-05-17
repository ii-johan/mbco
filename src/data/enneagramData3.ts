// src/data/enneagramData.ts

// 에니어그램 문항 하나의 타입을 정의합니다.
export interface EnneagramQuestion {
  id: number; // 문항 고유 번호
  text_ko: string; // 질문 내용 (한국어)
  // TODO: 필요하다면 다른 언어 질문 추가

  // ** 점수 계산을 위한 정보 추가 **
  scoring: {
    type: number; // 이 문항이 영향을 미치는 에니어그램 유형 번호 (1부터 9까지)
    // value: number; // (선택 사항) 이 문항이 특정 유형에 기여하는 고정 점수 (예: '예'면 +1점)
    // weight: number; // (선택 사항) 이 문항의 점수 반영 가중치 (기본값 1)
    // polarity: 'positive' | 'negative'; // (선택 사항) 답변 점수를 그대로 반영할지(positive) 반대로 반영할지(negative)
    // 이 외에 테스트 설계에 맞는 복잡한 규칙을 나타낼 속성 추가 가능
  }[]; // 하나의 문항이 여러 유형에 영향을 줄 수 있다면 배열로 정의
}

// 에니어그램 90문항 데이터 배열
export const enneagramQuestions: EnneagramQuestion[] = [
  // TODO: 각 문항에 scoring 정보를 추가해주세요.
  // 예시:
  {
    id: 1,
    text_ko: "기준이 명확하지 않으면 마음이 불편해진다.",
    // 이 문항은 1번 유형 점수에 긍정적으로 기여한다고 가정
    scoring: [{ type: 1 }] // 기본적으로 type만 지정하면 1-7점 척도를 그대로 반영할 수 있습니다.
                           // 또는 { type: 1, weight: 1, polarity: 'positive' } 와 같이 명시적으로 표현 가능
  },
  {
    id: 2,
    text_ko: "어떤 일이든 제대로 해야 속이 후련하다.",
    // 이 문항은 1번 유형 점수에 긍정적으로 기여한다고 가정
    scoring: [{ type: 1 }]
  },
  {
    id: 3,
    text_ko: "실수한 사람을 보면 조용히 고쳐주고 싶다.",
     // 이 문항은 1번 유형 점수에 긍정적으로 기여하거나, 2번 유형 점수와 관련될 수 있습니다.
    scoring: [{ type: 1 }] // 1번 유형 관련으로 일단 예시
  },
  {
    id: 4,
    text_ko: "내가 맡은 일은 끝까지 책임지려한다.",
     // 이 문항은 1번 유형, 6번 유형 등 여러 유형과 관련될 수 있습니다.
    scoring: [{ type: 1 }, { type: 6 }] // 1번, 6번 유형 관련으로 예시
  },
    // ... 나머지 86개 문항에도 scoring 정보 추가 ...
   {
     id: 90,
     text_ko: "무던하고 조용한 상태가 이상적이다.",
     // 이 문항은 9번 유형 점수에 긍정적으로 기여한다고 가정
     scoring: [{ type: 9 }]
   }
];