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
    text_ko: "미래에 일어날 일들을 예측하거나 계획하는 것을 좋아한다.",
    text_ja: "未来に起こることを予測したり計画したりするのを楽しむ。",
    text_zh: "你享受预测或计划未来会发生的事。",
    text_en: "You enjoy predicting or planning things that will happen in the future.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 2,
    text_ko: "모임에 가면 사람들에게 둘러싸이기보다 조용히 있는 것을 선호한다.",
    text_ja: "パーティーや集まりに行くと、人に囲まれるより静かな場所にいるのを好む。",
    text_zh: "去派对或聚会时，你喜欢待在安静的地方而不是被人围着。",
    text_en: "When you go to parties or gatherings, you prefer staying in a quiet spot rather than being surrounded by people.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
   {
    id: 3,
    text_ko: "나는 위험을 감수하기보다 안전한 삶의 방식을 선호한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  
  {
    id: 4,
    text_ko: "대화할 때 주도적으로 말하기보다 들어주는 편이다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 5,
    text_ko: "상황을 판단할 때 개인적인 감정보다는 객관적인 기준을 적용한다.",
    text_ja: "",
    text_zh: "。",
    text_en: "",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 6,
    text_ko: "나는 여러 사람들과 함께 어울려서 하는 활동을 좋아한다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 7,
    text_ko: "나는 일을 시작하면 끝까지 밀고 나가는 추진력이 있다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 8,
    text_ko: "미래의 막연한 성공보다 눈앞의 작은성과에 관심이 간다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 9,
    text_ko: "어떤 일의 숨겨진 상징과 의미를 잘 파악한다는 소리를 듣는다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 10,
    text_ko: "나는 다른 사람을 칭찬하거나 격려하는데 익숙하다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 11,
    text_ko: "미리미리 준비를 끝내고 마음 편히 있는것을 좋아한다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 12,
    text_ko: "나는 걱정하기보다 대체로 침착함을 유지하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 13,
    text_ko: "주식,부동산,코인 등 위험한 투자보다는 저축을 선호한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 14,
    text_ko: "새로운 정보나 기회가 나타나면 기존 계획을 쉽게 변경할수 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 15,
    text_ko: "중요한 발표나 시험이 있어도 별로 불안해 하지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 16,
    text_ko: "나는 대화할때 상대방의 눈을 거의 피하지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 17,
    text_ko: "계획에 얽매이지 않고 그때그때 상황에 따라 대처한다.",
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
    dimension: 'HL', // 확정된 지표 
    polarity: 'H', // 확정된 방향(극성) 
  },
  { id: 20,
    text_ko: "친구가 '우리는 미래에 뭘 하고 있을까?'라고 물으면 나는 내일의 점심메뉴가 궁금해진다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 21,
    text_ko: "나는 마감일이 다가올 때까지 여유부리는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 22,
    text_ko: "미래에 대한 막연한 두려움 때문에 새로운 시도를 망설일 때가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 23,
    text_ko: "비판을 할 때 상대방의 기분보다는 정확하고 솔직하게 말하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 24,
    text_ko: "드라마를 보면서 종종 주인공의 감정에 푹 빠질 때가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 25,
    text_ko: "친구들과 수다를 떠는것보다 나만의 시간을 보내는게 편하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 26,
    text_ko: "논리적으로 말이 안되는 주장을 들으면 바로 반박하고 싶어진다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 27,
    text_ko: "실수했을 때 그 자리에서 바로 인정하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 28,
    text_ko: "현실적인 문제에 부딪히면 뭔가 큰 의미가 숨어있을거라 생각한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 29,
    text_ko: "실망스러운 일을 겪어도 금새 털고 일어나는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 30,
    text_ko: "나는 감정기복이 심한 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 31,
    text_ko: "파티나 모임에서 활발하게 참여하고 분위기를 주도하는 것을 좋아한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 32,
    text_ko: "실제로 벌어지지 않을 일을 가지고 걱정할 때가 종종 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 33,
    text_ko: "남을 뒷담화를 하는 자리에 끼어 있으면 나는 조용히 앉아있지 않고 슬그머니 피한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 34,
    text_ko: "공공의 이익을 위해서라면 법을 좀 어기는 것도 용납된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 35,
    text_ko: "여행갈때 자세한 계획을 짜지않고 자유롭게 그냥 떠나는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 36,
    text_ko: "친구들한테 독특하다는 말을 들을 정도로 상상력이 풍부하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 37,
    text_ko: "남들에 비해 나만 뒤처지고 있다는 생각에 스트레스가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 38,
    text_ko: "나는 꿈을 꾸면 꿈에 대한 해석에 푹 빠진다다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 39,
    text_ko: "나는 칭찬을 들으면 부끄러워하거나 겸손해지는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 40,
    text_ko: "복잡한 이론이나 추상적인 개념보다는 실용적인 정보에 더 가치를 둔다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 41,
    text_ko: "나는 약속시간에 가끔 늦는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",   
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 42,
    text_ko: "다른 사람의 물건을 허락없이 사용하는 것에 크게 신경쓰지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 43,
    text_ko: "나는 다른 사람의 성공을 진심으로 축하해주기보다 질투심을 느낄 때가 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 44,
    text_ko: "상대의 감정을 상하게 할까봐 솔직한 의견을 말하기가 어렵다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 45,
    text_ko: "나는 스트레스가 심할 때도 잠을 잘 자고 식사를 거르지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 46,
    text_ko: "사람들과 대화할 때 그들이 하는 말의 진짜 속내가 무엇인인지 분석하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 47,
    text_ko: "눈으로 보지 않으면 잘 믿지 않는다.",
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
    text_ko: "갑자기 낯선 사람이 말을 걸면 당황한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 50,
    text_ko: "나는 본능적인 느낌보다는 직접 경험한 것을 더 신뢰한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 51,
    text_ko: "남을 위해 내가 희생해야 된다는 건 말이 안된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 52,
    text_ko: "다른 사람의 부정적인 말에 쉽게 영향을 받고 기분이 상한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 53,
    text_ko: "나는 친구를 사귀는데 시간이 걸리는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 54,
    text_ko: "다른 사람의 감정에 상처를 주지 않기 위해 말을 신중하게 고르는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 55,
    text_ko: "다른 사람의 감정 변화를 잘 알아차리고 그에 맞춰 반응하는 것이 서툴다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 56,
    text_ko: "많은 사람 앞에서 발표할 때 떨리기 보다는 의욕이 솟구친다.",
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
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 58,
    text_ko: "지금 떠오르는 생각과 감정을 즉각 말하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 59,
    text_ko: "일을 시작하기 전에 계획을 세우고 체계적으로 진행하는 것을 좋아한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 60,
    text_ko: "나는 복잡한 설명서 없이도 조립 가구를 뚝딱 만들어내는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 61,
    text_ko: "나는 공정하고 정직한 방식으로 경쟁하는 것을 중요하게 생각한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 62,
    text_ko: "소수의 진실한 친구가 다수의 즐거운 친구보다 낫다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 63,
    text_ko: "다른 사람의 어려움을 보면 마치 내 일처럼 마음이 아프다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 64,
    text_ko: "나는 대부분의 결정을 신속하게 내리는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 65,
    text_ko: "나는 다정하다는 말보다는 무뚝뚝하다는 말을 많이 듣는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
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
    text_ko: "다른 사람에게 잘 보이기 위해 사실을 과장하거나 왜곡할 때가 있다.",
    text_ja: "他の人の 때意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 69,
    text_ko: "항상 웃으면서 대화하려고 한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 70,
    text_ko: "논리적인 근거 없이 감정에만 호소하는 주장은 설득력이 없다고 생각한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 71,
    text_ko: "친구들과 오랜 시간을 보내고 오면 에너지가 충전된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 72,
    text_ko: "즉흥적으로 행동하기보다 계획적으로 일을 시작하는 편이다.",
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