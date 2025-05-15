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
    text_ko: "나는 미래에 일어날 일들을 예측하거나 계획하는 것을 좋아한다.",
    text_ja: "未来に起こることを予測したり計画したりするのを楽しむ。",
    text_zh: "你享受预测或计划未来会发生的事。",
    text_en: "You enjoy predicting or planning things that will happen in the future.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 2,
    text_ko: "모임에 가면 사람들에게 둘러싸이기보다 조용한 곳에 머무르는 것을 선호한다.",
    text_ja: "パーティーや集まりに行くと、人に囲まれるより静かな場所にいるのを好む。",
    text_zh: "去派对或聚会时，你喜欢待在安静的地方而不是被人围着。",
    text_en: "When you go to parties or gatherings, you prefer staying in a quiet spot rather than being surrounded by people.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
   {
    id: 3,
    text_ko: "나는 걱정하기보다는 대체로 침착함을 유지하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  
  {
    id: 4,
    text_ko: "대화할 때 나는 주도적으로 말하기보다 주로 들어주는 편이다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 5,
    text_ko: "나는 결정을 내릴 때 사람과의 감정보다는 이성과 논리를 따른다.",
    text_ja: "",
    text_zh: "。",
    text_en: "",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 6,
    text_ko: "나는 여러 사람들과 함께 어울려서 하는 활동을 즐긴다.",
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
    text_ko: "나는 추상적인 생각보다 구체적이고 현실적인 관심사를 선호한다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 9,
    text_ko: "어떤 일의 숨겨진 상징과 의미를 잘 파악한다는 소리를 많이 듣는다.",
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
    text_ko: "나는 조직생활에 얽매이는 것을 답답해하지 않는다.",
    text_ja: "。",
    text_zh: "。",
    text_en: ".",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'J', // 확정된 방향(극성)
  },
  {
    id: 12,
    text_ko: "나는 위험을 감수하기보다는 안전한 길을 선호한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 13,
    text_ko: "나는 새로운 도전에 대해 자신감을 가지고 임한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
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
    text_ko: "나는 미래에 대한 불확실성 때문에 종종 불안감을 느낀다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 16,
    text_ko: "나는 대화할 때 상대방의 눈을 거의 피하지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 17,
    text_ko: "나는 계획에 얽매이지 않고 그때그때 상황에 따라 대처하는 편이다.",
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
    text_ko: "친구가 상상력을 발휘해서 질문하면 나는 그 질문이 별로 흥미롭지 않을 때가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 21,
    text_ko: "나는 천천히 여유부리다 마감시간에 쫓겨 부랴부랴 일할 때가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 22,
    text_ko: "나는 세상과 인생이 돌아가는 것을 보면서 화가 날 때가 많이 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 23,
    text_ko: "친구에게 서운하다는 말을 들어도 나는 별로 서운하지 않다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 24,
    text_ko: "나는 드라마를 보면서 종종 주인공의 감정에 푹 빠질 때가 많다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'F', // 확정된 방향(극성)
  },
  {
    id: 25,
    text_ko: "나는 사람들과 수다를 떠는 것보다 혼자 조용히 시간을 보내는게 좋다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'I', // 확정된 방향(극성)
  },
  {
    id: 26,
    text_ko: "나는 논리적으로 잘 이해가 안되면 쉽게 공감해주지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 27,
    text_ko: "나는 실수했을 때 그 자리에서 바로 인정하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 28,
    text_ko: "나는 갑자기 공돈이 생기면 생활용품을 사기보다는 낭만적으로 사용할 것 같다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 29,
    text_ko: "갑자기 어려운 상황이 닥쳐도 나는 대체로 긍정적으로 생각하는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 30,
    text_ko: "나는 작은 스트레스에도 크게 영향을 받을 때가 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 31,
    text_ko: "많은 사람 앞에서 발표할 때 나는 떨리기보다는 의욕이 솟구치는 편이다.",
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
    text_ko: "남을 돕기 위해서라면 법을 살짝 어기는 정도는 괜찮다고 생각한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 35,
    text_ko: "나는 여행갈 때 치밀하게 계획을 짜지 않고 그냥 자유롭게 떠나는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'JP', // 확정된 지표 배분
    polarity: 'P', // 확정된 방향(극성)
  },
  {
    id: 36,
    text_ko: "친구들한테 독특하다는 말을 들을 정도로 나는 상상력이 풍부하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 37,
    text_ko: "남들에 비해 나만 뒤쳐치고 있다는 생각에 스트레스를 받을 때가 많이 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 38,
    text_ko: "나는 직설적으로 말하기보다는 은유적으로 돌려서 말하는걸 좋아한다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'N', // 확정된 방향(극성)
  },
  {
    id: 39,
    text_ko: "일을 잘해서 칭찬받고 있는데도 나는 그 상황이 불편할 때가 있다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 40,
    text_ko: "나는 패션과 요리와 운동과 같은 현실적인 관심사를 많이 좋아한다.",
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
    text_ko: "일단 한번 뱉은 말이라 할지라도 필요하다면 언제든지 말을 바꿀 수 있다.",
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
    text_ko: "다른 사람의 지지나 격려가 없어도 쉽게 좌절하지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'A', // 확정된 방향(극성)
  },
  {
    id: 46,
    text_ko: "사랑하는 사람과 함께라면 가난은 크게 문제가 되지 않는다.",
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
    text_ko: "시끌벅적한 시장보다 조용한 호숫가가 마음이 더 편하다.",
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
    text_ko: "남을 위해 내가 좀 희생해야 된다는 주장은 쉽게 이해가 안된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'L', // 확정된 방향(극성)
  },
  {
    id: 52,
    text_ko: "오늘을 즐겁게 살고 내일은 걱정하지 말라는 말이 나에게는 위로가 안된다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'AB', // 확정된 지표 배분
    polarity: 'B', // 확정된 방향(극성)
  },
  {
    id: 53,
    text_ko: "모르는 사람과의 대화는 좀 불편하다.",
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
    text_ko: "낯선 사람이 갑자기 말을 걸어도 당황하지 않는다.",
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
    text_ko: "아이디어의 제공과 실현 중에 나는 실현하는 편에 가깝다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'SN', // 확정된 지표 배분
    polarity: 'S', // 확정된 방향(극성)
  },
  {
    id: 61,
    text_ko: "지금까지의 나의 성취는 내 능력보다는 주변의 도움이 더 컸다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'HEXACO',
    dimension: 'HL', // 확정된 지표 배분
    polarity: 'H', // 확정된 방향(극성)
  },
  {
    id: 62,
    text_ko: "진실된 소수의 친구가 즐거운 다수의 친구보다 낫다.",
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
    text_ko: "사람 사는 세상인데 때로는 뒷담화도 필요하다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
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
    text_ko: "나는 감정적인 호소에 설득 당하지 않는 편이다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'TF', // 확정된 지표 배분
    polarity: 'T', // 확정된 방향(극성)
  },
  {
    id: 71,
    text_ko: "나는 친구들과 하루 종일 놀아도 지치지 않는다.",
    text_ja: "他の人の意見や評価は、あまり気にしない。",
    text_zh: "你不太在意别人的意见或评价。",
    text_en: "You do not care much about other people's opinions or evaluations.",
    type: 'MBTI',
    dimension: 'EI', // 확정된 지표 배분
    polarity: 'E', // 확정된 방향(극성)
  },
  {
    id: 72,
    text_ko: "나는 대부분의 상황을 직접 관리하고 결정하는 편이다.",
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