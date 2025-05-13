// my-embico-app/src/data/testData.ts (최종 구조)

// 각 질문 객체의 타입을 정의합니다.
export interface Question {
  id: number; // 질문 고유 번호
  // 언어별 질문 텍스트
  text_ko: string; // 한국어 질문
  text_ja: string; // 일본어 질문
  text_zh: string; // 중국어 질문
  text_en: string; // 영어 질문

  // 결과 계산을 위해 필요한 속성
  type: 'MBTI' | 'HEXACO'; // 질문이 MBTI 관련인지 HEXACO 관련인지
  dimension: 'EI' | 'SN' | 'TF' | 'JP' | 'AB' | 'HL'; // 해당 질문이 측정하는 지표
  polarity: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' | 'A' | 'B' | 'H' | 'L'; // '매우 그렇다' 응답 시 해당되는 극성

  // 필요하다면 여기에 어떤 문항이 Fast test(36)에 포함되는지 정보도 추가 가능 (예: isFastTest: boolean;)
}

// 검사 질문 데이터 배열 (여기에 72개 질문 객체를 모두 채워 넣습니다.)
export const testQuestions: Question[] = [
  // 예시 질문들 (속성을 모두 채운 형태)
  {
    id: 1,
    text_ko: "미래에 일어날 일들을 예측하거나 계획하는 것을 즐긴다.",
    text_ja: "未来に起こることを予測したり計画したりするのを楽しむ。",
    text_zh: "你享受预测或计划未来会发生的事。",
    text_en: "You enjoy predicting or planning things that will happen in the future.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 2,
    text_ko: "파티나 모임에 가면 사람들에게 둘러싸이기보다 조용한 곳에 머무르는 것을 선호한다.",
    text_ja: "パーティーや集まりに行くと、人に囲まれるより静かな場所にいるのを好む。",
    text_zh: "去派对或聚会时，你喜欢待在安静的地方而不是被人围着。",
    text_en: "When you go to parties or gatherings, you prefer staying in a quiet spot rather than being surrounded by people.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
   {
    id: 3,
    text_ko: "다른 사람의 의견이나 평가에 크게 신경 쓰지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  
  {
    id: 4,
    text_ko: "상대방과 말할 때 대화의 주도권이 나에게 별로 없는 편이다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 5,
    text_ko: "결정을 내릴 때 논리와 이성을 중요하게 생각한다.",
    text_ja: "",
    text_zh: "。",
    text_en: "",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 6,
    text_ko: "여러 사람들과 함께 어울리는 활동을 즐긴다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 7,
    text_ko: "해야할 일 목록을 만들고 하나씩 지워나가는데 만족감을 느낀다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 8,
    text_ko: "구체적이고 현실적인 정보에 집중하는 편이다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 9,
    text_ko: "상징이나 숨겨진 의미를 파악하는데 관심이 많다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 10,
    text_ko: "다른 사람을 칭찬하거나 격려하는데 익숙하다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 11,
    text_ko: "돈이나 권력에 크게 욕심이 없다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 12,
    text_ko: "내가 한 일에 대해 자주 만족하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 13,
    text_ko: "새로운 도전에 대해 자신감을 가지고 임한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 14,
    text_ko: "여러가지 일을 동시에 벌여 놓고 처리할 때가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 15,
    text_ko: "주변의 시선과 평가를 의식하지 않는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 16,
    text_ko: "대화할 때 눈을 거의 피하지 않고 응시한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 17,
    text_ko: "상황에 따라 융통성있게 행동하는 것을 좋아한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 18,
    text_ko: "돈과 양심 중에 나는 돈을 택한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 19,
    text_ko: "세상에는 나보다 나은 사람들이 많다고 생각한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 20,
    text_ko: "평생 한가지 음식만 먹는다면 넌 뭘 먹을래라고 묻는다면 말하는 그 사람이 좀 이상하게 느껴진다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 21,
    text_ko: "천천히 여유부리다 마감시간에 쫓겨 부랴부랴 일한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 22,
    text_ko: "세상 돌아가는 일을 보며 자주 발끈한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 23,
    text_ko: "남을 돕는 일이라 해도 법을 어긴다는건 용납이 안된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 24,
    text_ko: "드라마를 보면서 주인공의 감정에 자주 빠져든다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 25,
    text_ko: "사람들과 떠드는 것보다 혼자 하는 게임이 더 좋다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 26,
    text_ko: "이해가 안되도 공감은 해줘야지라고 말하면 어이가 없다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 27,
    text_ko: "실수했을 때 바로 인정하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 28,
    text_ko: "공돈이 생기면 필요한 물건을 사기보다는 여행을 간다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 29,
    text_ko: "어려운 상황이 닥쳐도 긍정적으로 생각하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 30,
    text_ko: "작은 스트레스 큰 좌절 그게 바로 나다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 31,
    text_ko: "다른 사람 앞에서 발표하면 신바람이 난다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 32,
    text_ko: "나라에 전쟁이 날까봐 걱정을 많이 한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 33,
    text_ko: "새치기 하는 사람은 절대 안봐준다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 34,
    text_ko: "공짜 샘플이라면 되도록 많이 챙기는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 35,
    text_ko: "여행갈 때 치밀한 계획보다 자유롭게 노는게 더 좋다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 36,
    text_ko: "친구들한테 독특하다는 말을 자주 듣는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 37,
    text_ko: "사회에서 나만 도태된다는 생각으로 스트레스를 받는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 38,
    text_ko: "직설적으로 말하기보다는 은유적으로 돌려서 말한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 39,
    text_ko: "내가 잘하고 칭찬받을 때 간혹 불편하기도 하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 40,
    text_ko: "나는 세상이 너무 좋아 천국에는 그다지 관심이 없다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 41,
    text_ko: "약속시간에 좀처럼 늦지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 42,
    text_ko: "야한 생각이 나도 양심까지 찔리지는 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 43,
    text_ko: "일단 한번 뱉은 말이라 할지라도 필요하면 돌이킨다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 44,
    text_ko: "다른 사람의 감정을 상하게 할까봐 솔직한 의견을 말하기 망설일 때가 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 45,
    text_ko: "나는 미래에 대해 그다지 걱정하지 않는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 46,
    text_ko: "사랑하는 사람과 함께라면 가난해도 괜찮다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 47,
    text_ko: "눈으로 보지 않으면 잘 믿지 않는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 48,
    text_ko: "내 방은 늘 지저분하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 49,
    text_ko: "도서관에서 칸막이 자리가 더 좋다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 50,
    text_ko: "어떤 일에 대해 판단할 때 느낌보다는 사실을 중시하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 51,
    text_ko: "차라리 조금 손해보고 마음만은 편한겠다는건 이해가 안된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 52,
    text_ko: "오늘의 일보다 내일의 걱정이 많이 앞선다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 53,
    text_ko: "모르는 사람과 말하면 좀 불편하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 54,
    text_ko: "법과 원칙보다는 평화와 융통성이 중요하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 55,
    text_ko: "논쟁이나 다툼을 그다지 신경쓰지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 56,
    text_ko: "낯선 사람에게 먼저 다가가 말을 거는 것이 어렵지 않다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 57,
    text_ko: "중요한 결정을 내릴 때 혹시 실패할까봐 불안하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 58,
    text_ko: "지금 떠오르는 생각과 감정을 즉각 말한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 59,
    text_ko: "일을 체계적으로 진행하지 않으면 마음이 불편하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 60,
    text_ko: "이론보다 경험을 중시한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 61,
    text_ko: "지금의 나의 성취에 큰 불만이 없다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 62,
    text_ko: "진실된 친구 소수가 많은 친구보다 낫다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 63,
    text_ko: "상대와 대화할 때 공감을 많이 하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 64,
    text_ko: "변화가 많고 예측하기 어려우면 좀 불안하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 65,
    text_ko: "친구가 약속 없이 갑자기 만나자고 하면 자주 나간다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 66,
    text_ko: "절망에 빠진 사람들을 TV로 보면 마음이 불편해서 채널을 돌린다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 67,
    text_ko: "책장 안의 책이 한권 튀어나와 있으면 눈에 엄청 거슬린다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 68,
    text_ko: "사람 사는 세상인데 때로는 뒷담화도 필요하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 69,
    text_ko: "항상 웃으며 대화하려고 한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 70,
    text_ko: "친구에게 좀 서운하다는 말을 들어도 별로 신경이 쓰이지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 71,
    text_ko: "조용한 호숫가보다는 시끌벅적한 시장이 즐겁다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 72,
    text_ko: "어떤 일의 세부사항까지 주의깊게 살피는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  // ... (여기에 나머지 72개 질문 모두를 위 형식에 맞춰 추가해야 합니다.)
  // 각 질문마다 id, text_ko, text_ja, text_zh, text_en, type, dimension, polarity 속성을 모두 포함해야 합니다.

];