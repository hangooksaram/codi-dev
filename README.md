# [CODI(Co-disabled)](https://codisabled.com)
<div align="center">
  <img width="310" alt="로고 이미지" src="https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/codi_logo_img.png">
</div>

> CODI(Co-Disabled)는 together의 축약어인 CO와 장애인이라는 뜻의 DISABLED의 합성어로, 장애인 멘티와 멘토가 함께 만들어 가는 멘토링 플랫폼 서비스입니다.

```markdown
☝🏻 현재 페이지는 CODI의 Server README 입니다.
☝🏻 CODI는 `제 2회 고용노동 공공데이터 활용 공모전`에 출품하여 장려상을 받았습니다.
☝🏻 2024년 3월 29일 현재까지 지속적으로 개발 및 운영 중입니다. :)
```

## 📎 배포 링크
**https://codisabled.com**

## 🌟 기본 기능
### 🧑🏻‍🎓 멘티
- 멘티 프로필 등록, 수정, 조회
  - 회원가입 후 프로필을 작성하면 멘티로서 멘토링을 신청 가능
- 관심 멘토 설정
- 멘토링 신청
- 멘토링 일정 조회
- 멘토 별점 평가
### 🧑🏻‍🏫 멘토
- 멘토 프로필 등록, 수정, 조회
  - 일반 회원가입 후 프로필 작성을 해야만 멘토 프로필 작성을 통해 멘토로 활동 가능
  - 멘토 프로필에는 멘토링 횟수와 멘토링 신청 건에 대한 응답률을 제공
- 멘토 정보 검색 기능
  - 장애 유형, 직무, 경력, 멘토 이름, 자기소개 내용을 기반으로 입력된 키워드 단위의 검색 가능
- 멘토링 스케줄 등록, 수정, 삭제
- 멘토링 요청 수락 또는 거절
  - 멘토링은 멘토가 정한 플랫폼(discord, kakao talk 등)에서 할 수 있도록 링크를 등록
## 🌟 핵심 기능
- 직무 추천 기능
  - 약 37,000개의 장애인 취업 정보 데이터 기반으로 상위 3개의 직무 추천
- 멘토 추천 기능
  - 사용자의 희망 직무, 추천 받은 직무, 장애 유형 등 주요 데이터에 가중치를 적용해 개인화된 멘토를 추천

## 👥 팀원 소개
|Designer|PM|FE|BE|
|:------:|:---:|:---:|:---:|
|![](https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/%08codi_character.png)|![](https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/%08codi_character.png)|![](https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/%08codi_character.png)|![](https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/%08codi_character.png)|
|윤지숙|장보민|[오현재](https://github.com/hangooksaram)|[변찬중](https://github.com/chaning49)|

## 📊 ERD 설계
![Database](https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/codidatabase_erd.png)

## 🔧 기술 스택 - Backend
- Java 11
- Spring
  - Boot
  - Data JPA
  - Security
- QueryDSL
- JWT
- MySQL
- Swagger

## 🌐 프로젝트 구조
![architecture](https://codi-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/codi_server_architecture.png)

