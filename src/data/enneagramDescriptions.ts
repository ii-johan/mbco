// src/data/enneagramDescriptions.ts

// 에니어그램 기본 유형별 상세 설명 데이터 타입 정의
export interface TypeDescription {
    name_ko: string; // 유형 이름 (한국어) 예: '원칙주의자'
    name_en: string; // 유형 이름 (영어) 예: 'The Reformer'
    generalDescription_ko: string; // 일반적인 설명 (한국어)
    generalDescription_en: string; // 일반적인 설명 (영어)
    // TODO: 필요하다면 핵심 동기, 두려움, 욕구 등 추가 속성 정의
}

// 에니어그램 날개별 상세 설명 데이터 타입 정의
export interface WingDescription {
    description_ko: string; // 날개 조합에 대한 설명 (한국어)
    description_en: string; // 날개 조합에 대한 설명 (영어)
     // TODO: 필요하다면 추가 속성 정의
}


// 기본 유형별 상세 설명 데이터
// TODO: 실제 에니어그램 설명 콘텐츠로 채워 넣으세요.
export const typeDescriptions: { [type: number]: TypeDescription } = {
    1: { 
        name_ko: '원칙주의자',
        name_en: 'The Reformer',
        generalDescription_ko: '원칙과 완벽함을 추구하며, 올바르게 살고자 하는 유형입니다.',
        generalDescription_en: 'Principled and purposeful, self-controlled and perfectionistic.',
        // TODO: 1번 유형의 상세 설명 추가
    },
    2: {
        name_ko: '이타주의자',
        name_en: 'The Helper',
        generalDescription_ko: '타인을 돕고 사랑받고 싶어 하는 따뜻하고 진실된 유형입니다.',
        generalDescription_en: 'Generous and demonstrative, people-pleasing and possessive.',
        // TODO: 2번 유형의 상세 설명 추가
    },
    3: {
        name_ko: '성취주의자',
        name_en: 'The Achiever',
        generalDescription_ko: '성공과 인정을 중요시하며 목표 달성에 집중하는 유형입니다.',
        generalDescription_en: 'Adaptable and excelling, driven and image-conscious.',
        // ...
    },
    // ... (나머지 유형 데이터 추가) ...
    4: {
        name_ko: '개성주의자',
        name_en: 'The Individualist',
        generalDescription_ko: '독특하고 감성적이며 자신을 깊이 이해하려는 유형입니다.',
        generalDescription_en: 'Expressive, dramatic, and focused on uniqueness.',
        // ...
    },
    // ... (나머지 유형 데이터 추가) ...
    5: {
        name_ko: '탐구주의자',
        name_en: 'The Investigator',
        generalDescription_ko: '지적이고 독립적이며 관찰력이 뛰어난 유형입니다.',
        generalDescription_en: 'Analytical, detached, and knowledgeable.',
        // ...
    },
    // ... (나머지 유형 데이터 추가) ...
    6: {
        name_ko: '충성주의자',
        name_en: 'The Loyalist',
        generalDescription_ko: '안전을 추구하고 신뢰를 중시하며 책임감이 강한 유형입니다.',
        generalDescription_en: 'Dutiful, cautious, and security-oriented.',
        // ...
    },
    // ... (나머지 유형 데이터 추가) ...
    7: {
        name_ko: '낙천주의자',
        name_en: 'The Enthusiast',
        generalDescription_ko: '즐거움을 추구하고 활동적이며 긍정적인 유형입니다.',
        generalDescription_en: 'Adventurous, optimistic, and easily distracted.',
        // ...
    },
    // ... (나머지 유형 데이터 추가) ...
    8: {
        name_ko: '도전주의자',
        name_en: 'The Challenger',
        generalDescription_ko: '강하고 단호하며 리더십을 가진 주도적인 유형입니다.',
        generalDescription_en: 'Assertive, decisive, willful, and protective.',
        // ...
    },
    // ... (나머지 유형 데이터 추가) ...
    9: {
        name_ko: '평화주의자',
        name_en: 'The Peacemaker',
        generalDescription_ko: '갈등을 피하고 평화와 조화를 추구하는 안정적인 유형입니다.',
        generalDescription_en: 'Receptive and reassuring, agreeable and complacent.',
        // ...
    },
};


// 날개 조합별 상세 설명 데이터
// 키 형식은 '기본유형-날개유형' 입니다. 예: '1-9', '1-2', '2-1', '2-3' 등
// TODO: 실제 에니어그램 날개 조합별 설명 콘텐츠로 채워 넣으세요.
export const wingDescriptions: { [wingKey: string]: WingDescription } = {
    '1-9': {
        description_ko: '1번 유형에 9번 날개의 영향을 받아 차분하고 이상적인 성향을 보입니다.',
        description_en: 'The 1w9 is more calm and idealistic, influenced by the 9 wing.',
    },
    '1-2': {
        description_ko: '1번 유형에 2번 날개의 영향을 받아 더 활동적이고 사람 중심적인 성향을 보입니다.',
        description_en: 'The 1w2 is more active and people-oriented, influenced by the 2 wing.',
    },
    '2-1': {
        description_ko: '2번 유형에 1번 날개의 영향을 받아 더 도덕적이고 이상적인 성향을 보입니다.',
        description_en: 'The 2w1 is more principled and altruistic, influenced by the 1 wing.',
    },
    '2-3': {
        description_ko: '2번 유형에 3번 날개의 영향을 받아 더 야심차고 활동적인 성향을 보입니다.',
        description_en: 'The 2w3 is more ambitious and socially skilled, influenced by the 3 wing.',
    },
    '3-2': {
        description_ko: '3번 유형에 2번 날개의 영향을 받아 더 친절하고 사람들과의 관계를 중요시하는 성향을 보입니다.',
        description_en: 'The 3w2 is more sociable and focused on connecting, influenced by the 2 wing.',
    },
    '3-4': {
        description_ko: '3번 유형에 4번 날개의 영향을 받아 더 개성적이고 창의적인 성향을 보입니다.',
        description_en: 'The 3w4 is more individualistic and artistic, influenced by the 4 wing.',
    },
    '4-3': {
        description_ko: '4번 유형에 3번 날개의 영향을 받아 더 사회적이고 성공을 추구하는 성향을 보입니다.',
        description_en: 'The 4w3 is more social and image-conscious, influenced by the 3 wing.',
    },
    '4-5': {
        description_ko: '4번 유형에 5번 날개의 영향을 받아 더 내성적이고 지적인 성향을 보입니다.',
        description_en: 'The 4w5 is more withdrawn and intellectual, influenced by the 5 wing.',
    },
    '5-4': {
        description_ko: '5번 유형에 4번 날개의 영향을 받아 더 개성적이고 감성적인 성향을 보입니다.',
        description_en: 'The 5w4 is more artistic and individualistic, influenced by the 4 wing.',
    },
    '5-6': {
        description_ko: '5번 유형에 6번 날개의 영향을 받아 더 충실하고 안전을 추구하는 성향을 보입니다.',
        description_en: 'The 5w6 is more loyal and security-oriented, influenced by the 6 wing.',
    },
    '6-5': {
        description_ko: '6번 유형에 5번 날개의 영향을 받아 더 지적이고 독립적인 성향을 보입니다.',
        description_en: 'The 6w5 is more intellectual and independent, influenced by the 5 wing.',
    },
    '6-7': {
        description_ko: '6번 유형에 7번 날개의 영향을 받아 더 활동적이고 낙관적인 성향을 보입니다.',
        description_en: 'The 6w7 is more sociable and optimistic, influenced by the 7 wing.',
    },
    '7-6': {
        description_ko: '7번 유형에 6번 날개의 영향을 받아 더 안정적이고 계획적인 성향을 보입니다.',
        description_en: 'The 7w6 is more community-oriented and loyal, influenced by the 6 wing.',
    },
    '7-8': {
        description_ko: '7번 유형에 8번 날개의 영향을 받아 더 단호하고 자기 주장이 강한 성향을 보입니다.',
        description_en: 'The 7w8 is more assertive and enterprising, influenced by the 8 wing.',
    },
    '8-7': {
        description_ko: '8번 유형에 7번 날개의 영향을 받아 더 활동적이고 재미를 추구하는 성향을 보입니다.',
        description_en: 'The 8w7 is more adventurous and enterprising, influenced by the 7 wing.',
    },
    '8-9': {
        description_ko: '8번 유형에 9번 날개의 영향을 받아 더 차분하고 평화로운 성향을 보입니다.',
        description_en: 'The 8w9 is more calm and receptive, influenced by the 9 wing.',
    },
    
    '9-8': {
        description_ko: '9번 유형에 8번 날개의 영향을 받아 좀 더 단호하고 자기 주장이 강한 성향을 보입니다.',
        description_en: 'The 9w8 is more assertive and independent, influenced by the 8 wing.',
    },
     '9-1': {
        description_ko: '9번 유형에 1번 날개의 영향을 받아 좀 더 질서 있고 이상적인 성향을 보입니다.',
        description_en: 'The 9w1 is more orderly and idealistic, influenced by the 1 wing.',
    },
};

// TODO: 성격 건강 수준별 상세 설명 데이터 추가 (선택 사항)
// export const developmentLevelDescriptions: { [level: string]: string } = {
//     'Healthy': '...',
//     'Average': '...',
//     'Unhealthy': '...',
// };