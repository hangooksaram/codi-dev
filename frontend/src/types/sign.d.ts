/**
- 이름
- 나이
- 성별
- 아이디
- 비밀번호
- 이메일
 */
export type SignUpData = {
  birth: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  password: string;
};

export type SignInData = {
  id: string;
  password: string;
};
