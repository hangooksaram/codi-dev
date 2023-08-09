export const DISABILITIES = [
  "지체장애",
  "언어장애",
  "간장애",
  "뇌병변장애",
  "안면장애",
  "호흡기장애",
  "자폐성장애",
  "시각장애",
  "신장장애",
  "장루/요루장애",
  "정신장애",
  "청각장애",
  "심장장애",
  "뇌전증장애",
];
export const SEVERITIES = ["중증", "경증"];

export const CATEGORIZED_JOBS = [
  {
    category: "생산직",
    jobs: [
      "건설/채굴직",
      "금속/재료 설치/정비/생산직(판금/단조/주조/용접/도장 등)",
      "기계 설치/정비/생산직",
      "섬유/의복 생산직",
      "식품 가공/생산직",
      "인쇄/목재/공예 및 기타 설치/정비/생산직",
      "전기/전자 설치/정비/생산직",
      "제조 단순직",
      "화학/한경 설치/정비/생산직",
    ],
  },

  {
    category: "사무직",
    jobs: ["경영/행정/사무직", "금융/보험직", "관리직(임원/부서장)", "법률직"],
  },
  {
    category: "연구기술직",
    jobs: [""],
  },
  {
    category: "서비스직",
    jobs: [""],
  },
  {
    category: "기타",
    jobs: [""],
  },
];

export const JOBS = [
  "건설/채굴 연구개발직 및 공학기술직",

  "경호/경비직",

  "교육직",

  "농림어업직",
  "돌봄 서비스직(간병/육아)",
  "미용/예식 서비스직",

  "보건의료직",
  "사회복지/종교직",

  "스포츠/레크리에이션직",

  "여행/숙박/오락 서비스직",
  "영업/판매직",
  "예술/디자인/방송직",
  "운전/운송직",
  "음식 서비스직",
  "인문/사회과학 연구직",

  "자연/생명과학 연구직",

  "정보통신 설치/정비직",
  "정보통신 연구개발직 및 공학기술직",

  "제조 연구개발직 및 공학기술직",
  "청소 및 기타 개인서비스직",
];
export const ImagePath =
  "https://codi-frontend.s3.ap-northeast-1.amazonaws.com/images";

export const CAREERS = ["1 ~ 4년 차", "5 ~ 8년 차", "9 ~ 12년 차", "13년 이상"];

export const DATE = {
  YEARS: [
    1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
    1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
    1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
  ],
  MONTHS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  DAYS: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
};

export const PROFILE_MENU = [
  "마이페이지",
  "멘토 센터",
  "프로필 수정",
  "개인정보 수정",
];
export const PROFILE_MENU_HREFS = {
  [PROFILE_MENU[0]]: "/myInfo/",
  [PROFILE_MENU[1]]: "/myInfo/mentorCenter/",
  [PROFILE_MENU[2]]: "/myCodi",
  [PROFILE_MENU[3]]: "/myCodi",
};

export const SCHEDULE_TIME_TABLE = [
  "06:00 - 06:50",
  "07:00 - 07:50",
  "08:00 - 08:50",
  "09:00 - 09:50",
  "10:00 - 10:50",
  "11:00 - 11:50",
  "12:00 - 12:50",
  "13:00 - 13:50",
  "14:00 - 14:50",
  "15:00 - 15:50",
  "16:00 - 16:50",
  "17:00 - 17:50",
  "18:00 - 18:50",
  "19:00 - 19:50",
  "20:00 - 20:50",
  "21:00 - 21:50",
  "22:00 - 22:50",
  "23:00 - 23:50",
];

export const EMPLOYMENT_STATUSES = [
  "학생",
  "취업 준비생",
  "이직 준비중",
  "표시하지 않음(멘티로 표시)",
];

export const EMPLOYMENT_STATUSES_VALUE = new Map();
EMPLOYMENT_STATUSES_VALUE.set("학생", "STUDENT");
EMPLOYMENT_STATUSES_VALUE.set("취업 준비생", "JOBSEEKER");
EMPLOYMENT_STATUSES_VALUE.set("이직 준비중", "PREPARINGCHANGEJOB");
EMPLOYMENT_STATUSES_VALUE.set("표시하지 않음(멘티로 표시)", "MENTEE");
