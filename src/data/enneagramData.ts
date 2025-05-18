// src/data/enneagramData.ts

// 에니어그램 문항 하나의 타입을 정의합니다.
export interface EnneagramQuestion {
  id: number; // 문항 고유 번호
  text_ko: string; // 질문 내용 (한국어)
  // TODO: 필요하다면 다른 언어 질문 추가

  // ** 점수 계산을 위한 정보 추가 **
  // scoring 배열 안의 각 객체는 이 문항이 영향을 미치는 유형과 점수 반영 방식을 정의합니다.
  scoring: {
    type: number; // 이 문항이 영향을 미치는 에니어그램 유형 번호 (1부터 9까지)
    // 답변 점수(1-7)가 이 유형 점수에 어떻게 기여하는지 규칙 정의
    // polarity 속성: 답변 점수를 긍정적으로 반영할지(positive) 부정적으로 반영할지(negative)
    polarity: 'positive' | 'negative'; // 'positive'는 1->1, 7->7 반영. 'negative'는 1->7, 7->1 반영 (또는 다른 방식)
    weight?: number; // (선택 사항) 이 문항의 점수 반영 가중치 (기본값 1)

    // TODO: 사용자 테스트의 실제 채점 방식에 맞는 다른 속성 추가 가능
    // 예: valueMapping?: { [answerValue: number]: number }; // 특정 답변 점수가 몇 점으로 변환될지 매핑
  }[]; // 하나의 문항이 여러 유형에 영향을 줄 수 있다면 배열로 정의
}

// 에니어그램 90문항 데이터 배열
export const enneagramQuestions: EnneagramQuestion[] = [
  // TODO: 각 문항의 scoring 정보를 실제 테스트의 채점 기준에 맞게 정확하게 채워 넣으세요.
  //       아래 scoring 정보는 사용자분이 제공하신 주석과 일반적인 에니어그램 테스트 예시를 기반으로 제가 예상하여 채운 것입니다.
  //       실제 테스트의 채점 기준과 다를 수 있으니 반드시 확인 및 수정이 필요합니다.

  {
    id: 1,
    text_ko: "내가 특별하다는 확신이 있을 때 안정된다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 2,
    text_ko: "지시받는 걸 몹시 싫어한다." ,
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 3,
    text_ko: "누군가 나에게 의지하면 기분이 좋아진다." ,
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 4,
    text_ko: "내가 맡은 일은 끝까지 책임지려한다." ,
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 5,
    text_ko: "우울한 감정은 회피하고 싶어진다." ,
    // 낙천주의자 - 7번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 6,
    text_ko: "도움을 거절당하면 마음이 상한다." ,
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 7,
    text_ko: "나는 권위를 인정하면서도 거북한 감정이 동시에 존재한다." ,
    // 충성주의자 - 6번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 8,
    text_ko: "정보를 많이 모을수록 안정감을 느낀다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 9,
    text_ko: "내 의견보다는 주변 분위기를 따른다.",
    // 평화주의자 - 9번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 10,
    text_ko: "결과가 좋으면 과정은 중요하지 않다고 생각한다.",
    // 성취주의자 - 3번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 11,
    text_ko: "같은 일상이 반복되면 금세 싫증 난다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 12,
    text_ko: "경쟁 상황에서는 이기고 싶다는 욕심이 생긴다.",
    // 성취주의자 - 3번 유형 긍정 반영
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 13,
    text_ko: "선택지가 많으면 마음이 들뜬다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 14,
    text_ko: "규칙이 흐트러진 상황은 불쾌하다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 15,
    text_ko: "변화보다는 익숙함에 편안함을 느낀다.",
    // 평화주의자 - 9번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 16,
    text_ko: "효율이 떨어지면 답답해진다.",
    // 성취주의자 - 3번 유형 긍정 반영
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 17,
    text_ko: "내 일에 감정이 방해되는 걸 싫어한다.",
    // 성취주의자 - 3번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 18,
    text_ko: "감정 기복이 나라는 사람을 설명해준다고 느낀다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 19,
    text_ko: "감정적으로 친근하게 다가오는 사람은 부담스럽다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 20,
    text_ko: "격한 감정을 보면 위축된다.",
    // 평화주의자 - 9번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 21,
    text_ko: "실패는 내 가치를 떨어뜨리는 일처럼 느껴진다.",
    // 성취주의자 - 3번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 22,
    text_ko: "칭찬을 들으면 내가 필요한 사람 같아 뿌듯하다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 23,
    text_ko: "질문이 생기면 직접 찾아보는 편이다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 24,
    text_ko: "신뢰하는 사람이 생기면 깊이 의지한다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 25,
    text_ko: "다양한 가능성이 열릴 때 흥분된다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 26,
    text_ko: "불의를 보면 그냥 지나치기 어렵다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 27,
    text_ko: "부탁을 거절하면 미안한 마음이 오래 남는다",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 28,
    text_ko: "나만의 감성을 이해해주는 사람이 필요하다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 29,
    text_ko: "내가 주도하는 상황이 가장 편하다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 30,
    text_ko: "평범한 이야기에는 쉽게 몰입하지 못한다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
    // 주석 수정: // 또는 { type: 1, weight: 1, polarity: 'positive' }
  },
  {
    id: 31,
    text_ko: "준비가 안 된 상태는 견디기 힘들다.",
    // 충성주의자 - 6번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 32,
    text_ko: "사람들이 날 필요로 하면 기운이 난다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 33,
    text_ko: "혼자 깊이 생각하는 시간이 꼭 필요하다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 34,
    text_ko: "늘 '더 나아져야 한다'는 생각을 한다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 35,
    text_ko: "새로운 아이디어가 떠오르면 바로 실행하고 싶다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 36,
    text_ko: "사람들 사이의 조화가 가장 중요하다.",
    // 평화주의자 - 9번 유형 긍정 반영
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 37,
    text_ko: "실수한 사람을 보면 조용히 고쳐주고 싶다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 38,
    text_ko: "타인과 오래 함께 있으면 피로감을 느낀다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 39,
    text_ko: "타인을 돕고 나면 만족감이 크다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 40,
    text_ko: "혼자 결정하는 건 불안하게 느껴진다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 41,
    text_ko: "목표가 없으면 방향을 잃은 기분이다.",
    // 성취주의자 - 3번 유형 긍정 반영
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 42,
    text_ko: "감정 표현보다 관찰이 더 익숙하다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 43,
    text_ko: "감정보다 논리가 더 중요하다고 생각한다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 44,
    text_ko: "어떤 일이든 제대로 해야 속이 후련하다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 45,
    text_ko: "감정을 보여주는 건 약점이 될 수 있다고 본다.",
    // 도전주의자 - 8번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 46,
    text_ko: "즉흥적인 행동은 나를 불안하게 만든다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 47,
    text_ko: "성취감 없이는 쉽게 지루해진다.",
    // 성취주의자 - 3번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 48,
    text_ko: "감정보다 행동으로 먼저 반응한다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 49,
    text_ko: "누군가 내 실적을 알아주면 힘이 난다.",
    // 성취주의자 - 3번 유형 긍정 반영
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 50,
    text_ko: "내가 속한 집단에 충실한 편이다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 51,
    text_ko: "기준이 명확하지 않으면 마음이 불편해진다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 52,
    text_ko: "“나는 누구인가”라는 질문을 자주 한다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 53,
    text_ko: "새로운 아이디어를 떠올릴 때 큰 즐거움을 느낀다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 54,
    text_ko: "내면의 감정을 표현하고 싶을 때가 많다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 55,
    text_ko: "나 스스로에게 엄격한 편이다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 56,
    text_ko: "모르는 걸 묻기 전에 먼저 스스로 알아보려 한다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 57,
    text_ko: "상대의 감정을 잘 알아차리는 편이다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 58,
    text_ko: "안정적인 구조 안에 있을 때 가장 편하다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 59,
    text_ko: "주변 사람을 웃게 하는 게 즐겁다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 60,
    text_ko: "감정보다 원칙이 우선이라고 느낀다.",
    // 원칙주의자 - 1번 유형 긍정 반영
    scoring: [{ type: 1, polarity: 'positive' }],
  },
  {
    id: 61,
    text_ko: "즉흥적으로 움직이는 게 자연스럽다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 62,
    text_ko: "이미지 관리도 능력의 일부라고 본다.",
    // 성취주의자 - 3번 유형 긍정 반영
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 63,
    text_ko: "상상이나 예술이 현실보다 더 매력적으로 느껴질 때가 있다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 64,
    text_ko: "호의를 베풀고 인정받을 때 행복하다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 65,
    text_ko: "내 감정은 나만의 깊은 세계 같다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 66,
    text_ko: "‘만약’을 자주 생각하며 시뮬레이션한다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 67,
    text_ko: "일을 잘해내는 걸로 인정받고 싶다.",
    // 성취주의자 - 3번 유형 긍정 반영
    scoring: [{ type: 3, polarity: 'positive' }],
  },
  {
    id: 68,
    text_ko: "내가 힘들어도 남의 부탁은 잘 들어준다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 69,
    text_ko: "진부한 건 질색이다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 70,
    text_ko: "힘의 균형을 민감하게 느낀다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 71,
    text_ko: "누군가 다투면 내가 중재하려 든다.",
    // 평화주의자 - 9번 유형 긍정 반영
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 72,
    text_ko: "나는 흔한 사람으로 보이고 싶지 않다.",
    // 개성주의자 - 4번 유형 긍정 반영
    scoring: [{ type: 4, polarity: 'positive' }],
  },
  {
    id: 73,
    text_ko: "위협이 느껴지면 먼저 맞서려 한다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 74,
    text_ko: "갑작스러운 변화가 스트레스를 유발한다.",
    // 충성주의자 - 6번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 75,
    text_ko: "내가 도운 사람과 친밀해지고 싶다.",
    // 이타주의자 - 2번 유형 긍정 반영
    scoring: [{ type: 2, polarity: 'positive' }],
  },
  {
    id: 76,
    text_ko: "스스로를 주장하는 일이 어렵게 느껴진다.",
    // 평화주의자 - 9번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 77,
    text_ko: "믿음이 흔들리면 모든 게 불안해진다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 78,
    text_ko: "내 방식대로 관철시키고 싶은 욕구가 있다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 79,
    text_ko: "내 공간이 침범당하는 걸 꺼린다.",
    // 탐구주의자 - 5번 유형 긍정 반영
    scoring: [{ type: 5, polarity: 'positive' }],
  },
  {
    id: 80,
    text_ko: "강한 사람을 보면 오히려 불붙는다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
    // 주석 수정: // 또는 { type: 1, weight: 1, polarity: 'positive' }
  },
  {
    id: 81,
    text_ko: "내게 재미는 삶의 원동력이다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 82,
    text_ko: "약한 사람은 보호해줘야 한다고 생각한다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 83,
    text_ko: "내 감정은 나중으로 미루는 편이다.",
    // 평화주의자 - 9번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 84,
    text_ko: "늘 다음에 뭘 할지 계획 중이다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 85,
    text_ko: "타인의 약점을 본능적으로 파악한다.",
    // 도전주의자 - 8번 유형 긍정 반영
    scoring: [{ type: 8, polarity: 'positive' }],
  },
  {
    id: 86,
    text_ko: "진지한 감정 대화는 피하고 싶은 편이다.",
    // 낙천주의자 - 7번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 7, polarity: 'positive' }],
  },
  {
    id: 87,
    text_ko: "결정이 필요하면 남의 선택을 기다리게 된다.",
    // 평화주의자 - 9번 유형 긍정 반영
    // 참고: 이 문항의 의도에 따라 polarity가 'negative'일 수도 있습니다.
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 88,
    text_ko: "미래의 위험을 미리 대비하는 편이다.",
    // 충성주의자 - 6번 유형 긍정 반영
    scoring: [{ type: 6, polarity: 'positive' }],
  },
  {
    id: 89,
    text_ko: "타인을 비판하기보다는 이해하려한다.",
    // 평화주의자 - 9번 유형 긍정 반영
    scoring: [{ type: 9, polarity: 'positive' }],
  },
  {
    id: 90,
    text_ko: "나는 평화롭고 조용한 환경을 선호한다.",
    // 평화주의자 - 9번 유형 긍정 반영
    scoring: [{ type: 9, polarity: 'positive' }],
  },

];